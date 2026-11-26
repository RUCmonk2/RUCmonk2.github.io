#include <complex.h>
#include <stddef.h>

static const double PI = 3.14159265358979323846;

static int is_power_of_two(size_t n)
{
    return n != 0 && (n & (n - 1)) == 0;
}

static double complex root_power(size_t n, size_t q)
{
    return cexp(-2.0 * PI * I * ((double)q / (double)n));
}

// x reads n entries at this stride. out is a separate buffer.
static void fft_stride(const double complex *x, size_t stride,
                       size_t n, double complex *out)
{
    if (n == 1) {
        out[0] = x[0];
        return;
    }
    size_t m = n / 2;
    fft_stride(x,          2 * stride, m, out);
    fft_stride(x + stride, 2 * stride, m, out + m);
    for (size_t q = 0; q < m; ++q) {
        double complex a = out[q];
        double complex t = root_power(n, q) * out[q + m];
        out[q] = a + t;
        out[q + m] = a - t;
    }
}

int fft_recursive(const double complex *x, double complex *out,
                  size_t n)
{
    if (!x || !out || !is_power_of_two(n))
        return 0;
    fft_stride(x, 1, n, out);
    return 1;
}

// Advance j in bit-reversed order, swapping each pair once.
static void bit_reverse_order(double complex *a, size_t n)
{
    for (size_t i = 1, j = 0; i < n; ++i) {
        size_t bit = n >> 1;
        for (; j & bit; bit >>= 1)
            j ^= bit;
        j ^= bit;
        if (i < j) {
            double complex tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
    }
}

static void merge_layer(double complex *a, size_t n, size_t len)
{
    size_t m = len / 2;
    for (size_t start = 0; start < n; start += len) {
        for (size_t q = 0; q < m; ++q) {
            size_t u = start + q, v = u + m;
            double complex saved = a[u];
            double complex t = root_power(len, q) * a[v];
            a[u] = saved + t;
            a[v] = saved - t;
        }
    }
}

int fft_inplace(double complex *a, size_t n)
{
    if (!a || !is_power_of_two(n))
        return 0;
    bit_reverse_order(a, n);
    for (size_t len = 2; len <= n;) {
        merge_layer(a, n, len);
        if (len == n)
            break;
        len *= 2;
    }
    return 1;
}

int ifft_inplace(double complex *a, size_t n)
{
    if (!a || !is_power_of_two(n))
        return 0;
    for (size_t k = 0; k < n; ++k)
        a[k] = conj(a[k]);
    fft_inplace(a, n);
    for (size_t n0 = 0; n0 < n; ++n0)
        a[n0] = conj(a[n0]) / (double)n;
    return 1;
}
