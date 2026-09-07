// L02：多条 cout 语句连续输出
// 来源：L02_out_in.pdf，课件页码 12。
// 与 slides12_cout_text_multiline.cpp 的输出相同；分号结束语句，并不会让屏幕上的文字换行。

#include <iostream>
using namespace std;

int main() {
    cout << "This is ";
    cout << "a C++ ";
    cout << "program.";
    cout << endl;
    return 0;
}
