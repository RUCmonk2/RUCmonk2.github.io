// L02：一条 cout 语句分多行书写
// 来源：L02_out_in.pdf，课件页码 12。
// 输出：This is a C++ program.，末尾换行。

#include <iostream>
using namespace std;

int main() {
    cout << "This is "  // 行末没有分号，语句尚未结束
         << "a C++ "
         << "program."
         << endl;
    return 0;
}
