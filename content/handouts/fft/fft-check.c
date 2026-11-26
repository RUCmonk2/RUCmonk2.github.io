#include <assert.h>
#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#include "fft.c"

static uint32_t seed = 27;
static double sample(void)
{
    seed = 1664525u * seed + 1013904223u;
    return (double)(seed % 1601u) / 100.0 - 8.0;
}

// Independent O(n^2) definition, with forward sign and no scaling.
static void direct(const double complex *x, double complex *out, size_t n)
{
    for (size_t k = 0; k < n; ++k) {
        out[k] = 0;
        for (size_t j = 0; j < n; ++j) {
            double angle = -2.0 * PI * (double)k * (double)j / (double)n;
            out[k] += x[j] * (cos(angle) + I * sin(angle));
        }
    }
}

static void compare(const double complex *a, const double complex *b, size_t n)
{
    for (size_t k = 0; k < n; ++k)
        assert(cabs(a[k] - b[k]) < 2e-9);
}

// Reference map b -> j by reversing exactly log2(d) bits.
static size_t station_for_block(size_t b, size_t d)
{
    size_t j = 0;
    for (; d > 1; d >>= 1, b >>= 1)
        j = (j << 1) | (b & 1);
    return j;
}

static void verify_layers(const double complex *input, size_t n)
{
    double complex staged[256], samples[256], expected[256], recursive[256];
    memcpy(staged, input, n * sizeof *input);
    bit_reverse_order(staged, n);
    for (size_t m = 1;; m *= 2) {
        size_t d = n / m;
        for (size_t b = 0; b < d; ++b) {
            size_t j = station_for_block(b, d);
            for (size_t r = 0; r < m; ++r)
                samples[r] = input[j + r * d];
            direct(samples, expected, m);
            compare(staged + b * m, expected, m);
            fft_stride(input + j, d, m, recursive);
            compare(recursive, expected, m);
        }
        if (m == n)
            break;
        merge_layer(staged, n, 2 * m);
    }
}

static void verify_eight_point_trace(void)
{
    double complex a[8] = {1, 2, 3, 4, 5, 6, 7, 8};
    const double complex stage1[8] = {6, -4, 10, -4, 8, -4, 12, -4};
    bit_reverse_order(a, 8);
    merge_layer(a, 8, 2);
    compare(a, stage1, 8);
    merge_layer(a, 8, 4);
    assert(cabs(a[1] - (-4 + 4 * I)) < 2e-9);
    assert(cabs(a[5] - (-4 + 4 * I)) < 2e-9);
    merge_layer(a, 8, 8);
    assert(cabs(a[1] - (-4 + 4 * (1 + sqrt(2.0)) * I)) < 2e-9);
    assert(cabs(a[5] - (-4 + 4 * (1 - sqrt(2.0)) * I)) < 2e-9);
}

int main(void)
{
    double complex x[256] = {1, 2, 3, 4};
    const double complex answer[] = {10, -2 + 2*I, -2, -2 - 2*I};
    double complex recursive[256], inplace[256], direct_result[256];
    assert(fft_recursive(x, recursive, 4));
    compare(recursive, answer, 4);
    verify_eight_point_trace();

    for (size_t n = 1; n <= 256; n *= 2) {
        for (int sample_set = 0; sample_set < 12; ++sample_set) {
            for (size_t k = 0; k < n; ++k) {
                double re = sample();
                double im = sample();
                x[k] = re + I * im;
            }
            memcpy(inplace, x, n * sizeof *x);
            direct(x, direct_result, n);
            assert(fft_recursive(x, recursive, n));
            assert(fft_inplace(inplace, n));
            compare(recursive, direct_result, n);
            compare(inplace, direct_result, n);
            verify_layers(x, n);
            assert(ifft_inplace(inplace, n));
            compare(inplace, x, n);
        }
    }
    assert(!fft_inplace(x, 0));
    assert(!fft_recursive(x, recursive, 3));
    assert(!ifft_inplace(x, 7));
    puts("4- and 8-point examples; all layers and round trips for 108 complex vectors.");
    return 0;
}
