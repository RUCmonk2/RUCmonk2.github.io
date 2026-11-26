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

int main(void)
{
    double complex x[256] = {1, 2, 3, 4};
    const double complex answer[] = {10, -2 + 2*I, -2, -2 - 2*I};
    double complex recursive[256], inplace[256], direct_result[256];
    assert(fft_recursive(x, recursive, 4));
    compare(recursive, answer, 4);

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
            assert(ifft_inplace(inplace, n));
            compare(inplace, x, n);
        }
    }
    assert(!fft_inplace(x, 0));
    assert(!fft_recursive(x, recursive, 3));
    assert(!ifft_inplace(x, 7));
    puts("4-point case, 108 complex vectors and round trips checked.");
    return 0;
}
