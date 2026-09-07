// L02：未初始化的局部变量和全局变量
// 来源：L02_out_in.pdf，课件页码 21。
// 忠实保留课件反例：在 C++17 中读取未初始化的 int a 是未定义行为。
// 第一行没有可靠的预期输出，不能保证出现课件截图中的 32766。
// 编译器可能发出警告；将 int a; 改为 int a = 0; 即可修正。

#include <iostream>
using namespace std;

int b;  // 全局变量自动初始化为 0

int main() {
    int a;
    cout << a << endl;  // 课件反例：读取未初始化的局部变量
    cout << b << endl;
    return 0;
}
