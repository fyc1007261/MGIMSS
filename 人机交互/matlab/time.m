clc,clear
load water.txt; %把原始数据按照表中的格式存放在纯文本文件 water.txt
water=water';x=water(:)';
s=12; %周期 s=12
n=12; %预报数据的个数
m1=length(x); %原始数据的个数
for i=s+1:m1
 y(i-s)=x(i)-x(i-s);
end
m2=length(y); %周期差分后数据的个数
w=diff(y); %消除趋势性的差分运算
m3=length(w); %计算最终差分后数据的个数
for i=0:3
 for j=0:s+1
 %spec= garchset('R',i,'M',j,'Display','off'); %指定模型的结构
 spec = garch(i,j);
 EstMdl = estimate(spec, w);
 
 V = infer(EstMdl,xdata); %V = conditional variances, also n x 1
 xvol = sqrt(V);
 %[coeffX,errorsX,LLFX] = garchfit(spec,w); %拟合参数
 num=garchcount(coeffX); %计算拟合参数的个数
 %compute Akaike and Bayesian Information Criteria
 [aic,bic]=aicbic(LLFX,num,m3);
 fprintf('R=%d,M=%d,AIC=%f,BIC=%f\n',i,j,aic,bic); %显示计算结果
 end
end
save bdata x y w n m1 m2 s 