// L02：去掉输出中的空格
// 来源：L02_out_in.pdf，课件页码 14–15。
// 根据课件“没加空格会怎么样？”改写：输出两行 12 和 1.20.3。

#include <iostream>
using namespace std;

int main() {
    cout << 1 << 2 << endl << 1.2000000 << .3 << endl;
    return 0;
}
