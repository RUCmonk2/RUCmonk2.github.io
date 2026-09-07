// L02：printf 输出字符数组
// 来源：L02_out_in.pdf，课件页码 7。
// 课件的 printf(%s, content) 漏写引号，这里修正为 printf("%s", content)。

#include <stdio.h>

int main() {
    char content[] = "Welcome";
    printf("%s", content);
    return 0;
}
