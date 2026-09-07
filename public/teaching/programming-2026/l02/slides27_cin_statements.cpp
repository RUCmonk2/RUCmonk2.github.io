// L02：多条 cin 语句依次输入
// 来源：L02_out_in.pdf，课件页码 27。
// 课件只给出输入语句；这里补全类型声明和 main。程序读取后结束，无输出。
// 示例输入：1 2 1.5 2.5 3.5 4.5 A B
// 输入项可用空格、Tab 或换行分隔；逗号不是空白分隔符。

#include <iostream>
using namespace std;

int main() {
    int n1, n2;
    float f1, f2;
    double d1, d2;
    char c1, c2;

    cin >> n1 >> n2;
    cin >> f1 >> f2;
    cin >> d1 >> d2;
    cin >> c1 >> c2;
    return 0;
}
