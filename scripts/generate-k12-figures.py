"""Reproducible, locally served teaching diagrams. Python standard library only."""
from pathlib import Path
from html import escape
import math

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images/k12'
OUT.mkdir(parents=True, exist_ok=True)
INK, BLUE, RED, LINE, PAPER = '#354744', '#46686b', '#a46449', '#c9c7ba', '#f7f5ed'

def line(x1,y1,x2,y2,color=INK,dash=False,width=2):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{width}"'+(' stroke-dasharray="6 5"' if dash else '')+'/>'
def text(x,y,label,size=18,color=INK,anchor='middle'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}">{escape(str(label))}</text>'
def rect(x,y,w,h,fill=BLUE,opacity=.16):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" fill-opacity="{opacity}" stroke="{fill}" stroke-width="1.5"/>'
def circle(x,y,r,fill='none',stroke=INK):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>'
def polygon(points,fill=BLUE,opacity=.15):
    return '<polygon points="'+' '.join(f'{x},{y}' for x,y in points)+f'" fill="{fill}" fill-opacity="{opacity}" stroke="{fill}" stroke-width="2"/>'
def path(points,color=BLUE,width=2.5):
    return '<path d="'+' '.join(('M' if i==0 else 'L')+f'{x:.2f},{y:.2f}' for i,(x,y) in enumerate(points))+f'" fill="none" stroke="{color}" stroke-width="{width}"/>'
def save(name,title,desc,body,height=340):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="760" height="{height}" viewBox="0 0 760 {height}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc><rect width="760" height="{height}" rx="6" fill="{PAPER}"/><g font-family="system-ui, PingFang SC, Microsoft YaHei, sans-serif">'+text(30,34,title,19,anchor='start')+body+'</g></svg>'
    (OUT/(name+'.svg')).write_text(svg)

# A single whole compared at two resolutions.
b=''
for row,(n,filled,label) in enumerate([(4,3,'3 / 4'),(8,6,'6 / 8')]):
    y=78+row*95
    for i in range(n): b+=rect(80+i*480/n,y,480/n,55,BLUE, .24 if i<filled else 0)
    b+=text(635,y+35,label,26)
b+=text(380,296,'整体相同；每份再平分，所取的量不变。',18)
save('fractions','同一个整体，不同的分法','上方四等份取三份，下方八等份取六份，两条涂色长度相同。',b)

b=line(65,160,695,160)
for n in range(-4,5):
    x=380+n*70;b+=line(x,154,x,166)+text(x,193,n,17)
b+=line(170,124,380,124,RED)+line(380,124,590,124,BLUE)+circle(170,160,5,RED,RED)+circle(590,160,5,BLUE,BLUE)
b+=text(270,105,'距离 3',19,RED)+text(485,105,'距离 3',19,BLUE)+text(380,255,'−3 与 3 互为相反数，到 0 的距离都为 3。',19)
save('number-line','位置有方向，距离没有正负','数轴从负四到四，负三与正三到原点距离均为三。',b,300)

b=''
for i in range(3):
 for j in range(4): b+=rect(80+j*40,85+i*40,40,40,BLUE,.23 if j<2 else .06)
b+=text(160,246,'2 × 3 + 2 × 3',20)+text(355,158,'=',30)
for i in range(3):
 for j in range(4): b+=rect(450+j*40,85+i*40,40,40,BLUE,.23)
b+=text(530,246,'(2 + 2) × 3',20)+text(380,302,'先分成两块数，再合起来数，总量保持不变。',18)
save('distributive','分配律是同一块面积的两种计算','两组二乘三方格合为四乘三矩形，共十二格。',b)

b=polygon([(60,240),(260,240),(320,110),(120,110)])+polygon([(60,240),(120,240),(120,110)],RED,.2)+line(120,110,120,240,RED,True)
b+=line(350,180,410,180,RED)+polygon([(402,175),(410,180),(402,185)],RED,1)+text(380,160,'剪拼',17,RED)
b+=rect(450,110,200,130,BLUE,.12)+polygon([(590,240),(650,240),(650,110)],RED,.2)
b+=text(190,273,'底 b',20)+text(550,273,'长 b',20)+text(675,179,'高 h',18,RED)+text(380,318,'左块平移到右侧，面积不变；长方形的长 = 底，宽 = 高。',17)
save('area-transform','平行四边形剪拼成长方形','左侧三角形平移到右侧空缺处，成为底乘高的矩形，斜边不是高。',b)

b=polygon([(120,250),(600,250),(300,80)])+line(300,80,300,250,RED,True)+line(300,230,320,230,RED)+line(320,230,320,250,RED)+text(370,283,'底 b',20)+text(323,172,'高 h',20,RED,anchor='start')+text(380,316,'同底等高的三角形，面积都是底 × 高 ÷ 2。',18)
save('triangle-height','高必须垂直于所选的底','三角形顶点到底边作垂线，标出直角；斜边不充当这条底的高。',b)

b=circle(230,177,100)+line(230,177,330,177,RED)+line(130,177,330,177,BLUE,True)+circle(230,177,3,INK)+text(265,160,'r',22,RED)+text(230,204,'直径 d = 2r',18)+text(545,140,'周长：2πr',26,BLUE)+text(545,206,'面积：πr²',26,RED)+text(380,314,'半径变为原来的 2 倍：周长变为 2 倍，面积变为 4 倍。',17)
save('circle-measure','圆的一维长度与二维面积','圆中标注半径与直径，右侧分别给出周长和面积。',b)

b=''
for x,title in [(160,'圆柱'),(535,'圆锥')]:
 b+=f'<ellipse cx="{x}" cy="245" rx="85" ry="23" fill="{BLUE}" fill-opacity=".13" stroke="{BLUE}" stroke-width="2"/>'
 if title=='圆柱':
  b+=f'<ellipse cx="{x}" cy="90" rx="85" ry="23" fill="none" stroke="{BLUE}" stroke-width="2"/>'+line(x-85,90,x-85,245,BLUE)+line(x+85,90,x+85,245,BLUE)
 else: b+=line(x,90,x-85,245,BLUE)+line(x,90,x+85,245,BLUE)
 b+=line(x,90,x,245,RED,True)+line(x,245,x+85,245,RED)+text(x+15,165,'h',21,RED)+text(x+42,235,'r',21,RED)
 b+=text(x,295,title+('：πr²h' if title=='圆柱' else '：πr²h / 3'),23)
b+=text(380,348,'同底等高的比较；高与母线不同。',18)
save('cylinder-cone','同底等高，体积相差三倍','圆柱与圆锥底半径和垂直高度相同，圆锥体积为圆柱的三分之一。',b,380)

# Exact 3:4:5 triangle with three external squares.
A=(290,250);B=(410,250);C=(290,90)
b=polygon([A,B,C],INK,.06)+polygon([A,B,(410,370),(290,370)],RED,.18)+polygon([A,C,(130,90),(130,250)],BLUE,.18)+polygon([B,C,(450,-30),(570,130)],BLUE,.07)
# Shift down top to leave title clear and use a compact rotated drawing instead.
b='<g transform="translate(15 85)">'+b+text(350,312,'3² = 9',21,RED)+text(210,175,'4² = 16',21,BLUE)+text(450,164,'5² = 25',21,BLUE)+line(290,230,310,230)+line(310,230,310,250)+'</g>'+text(380,492,'9 + 16 = 25：比较的是三条边上的正方形面积。',18)
save('pythagoras','勾股定理：把边长变成面积','三四五直角三角形的三边外作正方形，面积九与十六之和为二十五。',b,525)

b=polygon([(100,245),(220,245),(100,165)])+polygon([(405,245),(645,245),(405,85)],RED,.14)+text(160,276,'3',21)+text(83,212,'2',21)+text(525,276,'6',21,RED)+text(385,172,'4',21,RED)+text(380,317,'长度比 1 : 2，面积比 1 : 4。',20)
save('similarity','相似放大：长度和面积的倍率不同','小直角三角形底三高二，大三角形底六高四，边长加倍而面积四倍。',b)

b=polygon([(150,245),(600,245),(600,90)])+line(580,245,580,225)+line(580,225,600,225)+f'<path d="M 207 245 A 57 57 0 0 0 204 226" fill="none" stroke="{RED}" stroke-width="2"/>'+text(223,232,'θ',23,RED)+text(382,278,'邻边',20)+text(624,171,'对边',20)+text(365,150,'斜边',20)+text(380,321,'相对角 θ：sin = 对边 / 斜边；cos = 邻边 / 斜边。',18)
save('right-trig','先确定角，再判断对边与邻边','右侧为直角，左端为研究角，底边是邻边，竖边是对边，上方斜边最长。',b)

# Coordinate diagrams generated from mathematical coordinates, not hand-fit curves.
def axes(x0=380,y0=220,s=45,xrange=(-5,5),yrange=(-3,3)):
 def xy(x,y): return x0+s*x,y0-s*y
 b=line(*xy(xrange[0],0),*xy(xrange[1],0),LINE)+line(*xy(0,yrange[0]),*xy(0,yrange[1]),LINE)+text(*xy(xrange[1]+.25,0),'x',17)+text(*xy(.25,yrange[1]),'y',17)+text(x0-13,y0+20,'0',15)
 return b,xy
b,xy=axes(380,270,45,(-5,5),(-1,4))
for v in [-2,-1,1,2]:b+=line(*xy(v,-.06),*xy(v,.06),LINE)+text(*xy(v,-.48),v,15)
b+=path([xy(-1+4*i/200,(((-1+4*i/200)-1)**2-1)) for i in range(201)],BLUE)+line(*xy(1,-1),*xy(1,4),RED,True)+circle(*xy(1,-1),4,RED,RED)+text(555,120,'y = (x − 1)² − 1',20)+text(555,152,'顶点 (1, −1)',18,RED)+text(380,366,'顶点、对称轴与零点在同一张图上互相校验。',17)
save('quadratic','一条抛物线的三种信息','抛物线顶点一负一，对称轴x等于一，零点为零与二。',b,395)

b,xy=axes(380,205,48,(-5,5),(-2.8,2.8))
b+=path([xy(x,2/x) for x in [(.75+i*.04) for i in range(108)]],BLUE)+path([xy(x,2/x) for x in [(-5+i*.04) for i in range(108)]],BLUE)+text(565,95,'xy = 2',23)+text(565,126,'y = 2 / x',23)+text(380,365,'x 不能为 0；两支曲线都不与坐标轴相交。',18)
save('inverse','反比例：乘积保持不变','正比例系数二的反比例函数，在第一和第三象限各有一支。',b,395)

b=circle(270,200,115)+line(125,200,415,200,LINE)+line(270,65,270,332,LINE)
px,py=270+115*.6,200-115*.8
b+=f'<path d="M 306 200 A 36 36 0 0 0 291.6 171.2" fill="none" stroke="{RED}" stroke-width="2"/>'+text(316,184,'θ',20,RED)+line(270,200,px,py,BLUE)+line(px,py,px,200,RED,True)+circle(px,py,4,RED,RED)+text(398,100,'P = (cos θ, sin θ)',20,BLUE)+text(309,225,'cos θ',18)+text(398,155,'sin θ',18,RED)+text(241,222,'O',18)+text(535,235,'半径 = 1',22)+text(380,363,'三角函数是圆上点的坐标，角可以超过 90°。',18)
save('unit-circle','单位圆：把角与坐标连接起来','第一象限点P连接原点，水平投影表示余弦，竖直坐标表示正弦。',b,395)

b,xy=axes(380,205,55,(-5,5),(-2.5,2.5))
b+=f'<ellipse cx="380" cy="205" rx="220" ry="132" fill="none" stroke="{BLUE}" stroke-width="2.5"/>'
# a=4, b=2.4, c=3.2 ; point at top has distances 4+4.
f1=xy(-3.2,0);f2=xy(3.2,0);p=xy(0,2.4)
b+=line(*f1,*p,RED)+line(*f2,*p,RED)+circle(*f1,4,RED,RED)+circle(*f2,4,RED,RED)+text(f1[0],f1[1]+25,'F₁',18)+text(f2[0],f2[1]+25,'F₂',18)+text(p[0]+30,p[1]+20,'P',18)+text(380,376,'PF₁ + PF₂ = 2a；焦点在内部，顶点在椭圆上。',18)
save('ellipse','椭圆：到两个焦点的距离之和固定','两个焦点位于横轴，椭圆上一点到焦点的两段距离以赭色显示。',b,405)

b,xy=axes(380,210,55,(-4.5,4.5),(-2.5,2.5))
b+=path([xy(math.cosh(t)*1.4,math.sinh(t)) for t in [-1.75+i*.0175 for i in range(201)]],BLUE)+path([xy(-math.cosh(t)*1.4,math.sinh(t)) for t in [-1.75+i*.0175 for i in range(201)]],BLUE)
b+=line(*xy(-3.5,-2.5),*xy(3.5,2.5),RED,True)+line(*xy(-3.5,2.5),*xy(3.5,-2.5),RED,True)+text(380,383,'两支彼此分离；渐近线描述远处的走向。',18)
save('hyperbola','双曲线与两条渐近线','焦点在横轴的双曲线左右两支逐渐接近相交的虚线渐近线。',b,415)

b,xy=axes(255,210,60,(-1.5,5.8),(-2.5,2.5))
b+=path([xy(t*t/2,t) for t in [-2.45+i*.0245 for i in range(201)]],BLUE)+line(*xy(-.5,-2.5),*xy(-.5,2.5),RED,True)
f=xy(.5,0);p=xy(2,2);q=xy(-.5,2)
b+=line(*f,*p,RED)+line(*q,*p,RED)+circle(*f,4,RED,RED)+circle(*p,4,BLUE,BLUE)+text(f[0],f[1]+25,'F',19)+text(p[0]+17,p[1]+4,'P',19)+text(170,355,'准线',18,RED)+text(505,310,'到焦点距离 = 到准线距离',17)+text(505,344,'示例：y² = 2x',20)
save('parabola','抛物线：一个点与一条直线','右开口抛物线，焦点F在横轴正半轴，准线在左侧；P到F与到准线的垂线段等长。',b,390)

b=''
positions=[(90,190),(295,110),(295,270),(580,70),(580,150),(580,230),(580,310)]
for a,c in [(0,1),(0,2),(1,3),(1,4),(2,5),(2,6)]:b+=line(*positions[a],*positions[c],LINE)
for i,label in enumerate(['开始','正','反','正正','正反','反正','反反']):b+=rect(positions[i][0]-29,positions[i][1]-22,58,36,PAPER,1)+text(positions[i][0],positions[i][1]+4,label,18)
b+=text(183,122,'1/2',18,RED)+text(183,270,'1/2',18,RED)+text(450,70,'1/2',18)+text(450,153,'1/2',18)+text(450,236,'1/2',18)+text(450,315,'1/2',18)+text(380,377,'独立抛两次公平硬币：每条完整路径的概率为 1/4。',18)
save('probability-tree','沿路径相乘，互斥路径相加','公平硬币两次试验树分出正正、正反、反正、反反四个等可能结果。',b,405)

b,xy=axes(140,305,95,(-.6,5.7),(-.1,2.5))
# Plot y=(x-1)^2 /4 near point x=2, y=.25, tangent slope .5 and secant x=3.
f=lambda x:(x-1)**2/4
b+=path([xy(x,f(x)) for x in [-.5+i*.021 for i in range(200)]],BLUE)+line(*xy(.8,-.35),*xy(4,1.25),RED)+line(*xy(1.6,-.05),*xy(4,1.75),LINE)
for x,label in [(2,'A'),(3,'B')]:
 p=xy(x,f(x));b+=circle(*p,4,INK)+text(p[0]-10,p[1]-14,label,18)
b+=text(580,100,'灰：割线 AB',19)+text(580,133,'赭：A 处切线',19,RED)+text(380,362,'让 B 沿曲线靠近 A，割线斜率趋向切线斜率。',18)
save('derivative','变化率：从两点走向一点','曲线在A处的切线与穿过A和B的割线显示不同斜率，B靠近A时两者趋近。',b,395)

b=line(110,260,600,260,LINE)+line(170,295,170,70,LINE)+line(170,260,540,110,BLUE,width=3)+line(170,260,540,260,RED,width=3)+line(540,110,540,260,LINE,True)+text(365,155,'向量 a',23,BLUE)+text(360,291,'沿 b 方向的投影',20,RED)+text(615,266,'b 方向',18)+text(380,345,'a · b = |a| |b| cos θ；数量积的结果是一个数。',18)
save('vector-projection','把斜向的变化分解出指定方向的部分','向量a从原点向右上方，其水平投影在b方向上，垂线把终点与投影终点连接。',b,380)

b=''
for i,p in enumerate([.125,.375,.375,.125]):
 x=155+i*135;b+=rect(x,285-p*440,75,p*440,BLUE,.24)+text(x+37,312,i,19)+text(x+37,270-p*440,str(p),18,RED)
b+=line(100,285,695,285,LINE)+text(380,362,'三次独立公平试验；成功 0、1、2、3 次的概率之和为 1。',17)
save('binomial','二项分布：数成功次数','三次独立成功率二分之一的伯努利试验，四个概率为八分之一、八分之三、八分之三、八分之一。',b,390)

xs=[-3.5+i*7/300 for i in range(301)]
xy=lambda x,y:(380+86*x,290-490*y)
b=line(65,290,695,290,LINE)
shade=[xy(-1,0)]+[xy(x,math.exp(-x*x/2)/math.sqrt(2*math.pi)) for x in [-1+i*.01 for i in range(201)]]+[xy(1,0)]
b+=polygon(shade,BLUE,.16)+path([xy(x,math.exp(-x*x/2)/math.sqrt(2*math.pi)) for x in xs],BLUE)
for x,label in [(-1,'μ − σ'),(0,'μ'),(1,'μ + σ')]:b+=line(*xy(x,0),*xy(x,.4),LINE,True)+text(380+86*x,319,label,20)
b+=text(380,212,'约 68.27%',22,RED)+text(380,365,'区间概率对应曲线下的面积；不是曲线在某点的高度。',17)
save('normal','正态分布：把偏离程度换成标准差单位','对称钟形曲线，均值左右各一个标准差的区域涂色，面积约百分之六十八点二七。',b,395)

b,xy=axes(160,300,62,(-.4,7),(-.1,3.6))
pts=[(1,1.1),(2,1),(3,1.9),(4,1.6),(5,2.5),(6,2.8)]
meanx=sum(x for x,y in pts)/len(pts)
meany=sum(y for x,y in pts)/len(pts)
slope=sum((x-meanx)*(y-meany) for x,y in pts)/sum((x-meanx)**2 for x,y in pts)
intercept=meany-slope*meanx
for x,y in pts:
 pred=intercept+slope*x;b+=line(*xy(x,y),*xy(x,pred),RED)+circle(*xy(x,y),4,BLUE,BLUE)
b+=line(*xy(.3,intercept+slope*.3),*xy(6.5,intercept+slope*6.5),BLUE)+text(315,86,'点：实际观测',18)+text(315,117,'线：预测趋势',18,BLUE)+text(315,148,'竖段：残差',18,RED)+text(380,358,'最小二乘比较竖直残差的平方和；相关不等于因果。',17)
save('regression','回归线与残差（示意数据）','六个点围绕趋势线分布，每个点到同一横坐标预测值的竖直距离用赭色线段标示。',b,390)

print(f'Generated {len(list(OUT.glob("*.svg")))} SVG teaching diagrams.')
