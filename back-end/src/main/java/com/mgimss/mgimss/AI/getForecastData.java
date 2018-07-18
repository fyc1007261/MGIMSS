package com.mgimss.mgimss.AI;
import com.mathworks.toolbox.javabuilder.MWArray;
import com.mathworks.toolbox.javabuilder.MWClassID;
import com.mathworks.toolbox.javabuilder.MWComplexity;
import com.mathworks.toolbox.javabuilder.MWNumericArray;
import com.mathworks.toolbox.javabuilder.MWCellArray;
import train.train;
//需要加入javabuild包 在V91的builertool中的javabuild中

public class getForecastData {
    public static void main(String[] args) throws Exception{
//        Long[] x={Long.valueOf(0),Long.valueOf(100),Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400),Long.valueOf(100),Long.valueOf(0),Long.valueOf(100),Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400),Long.valueOf(100),Long.valueOf(0),
//                Long.valueOf(100),Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400),Long.valueOf(100),Long.valueOf(0),Long.valueOf(100),Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400),Long.valueOf(100),Long.valueOf(0),
//                Long.valueOf(100),Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400),Long.valueOf(100),Long.valueOf(0),Long.valueOf(100),Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400),Long.valueOf(100),Long.valueOf(0),
//                Long.valueOf(100),Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400),Long.valueOf(100),Long.valueOf(0),Long.valueOf(100),Long.valueOf(400),Long.valueOf(900),Long.valueOf(1600),Long.valueOf(900),Long.valueOf(400),Long.valueOf(100),Long.valueOf(0)};
//
        Long[] x={Long.valueOf(0),Long.valueOf(1),Long.valueOf(4),Long.valueOf(9),Long.valueOf(16),Long.valueOf(36),Long.valueOf(16),Long.valueOf(9),Long.valueOf(4),Long.valueOf(1),Long.valueOf(0),Long.valueOf(1),Long.valueOf(4),Long.valueOf(9),Long.valueOf(16),Long.valueOf(36),Long.valueOf(16),Long.valueOf(9),Long.valueOf(4),Long.valueOf(1),Long.valueOf(0),Long.valueOf(1),Long.valueOf(4),Long.valueOf(9),Long.valueOf(16),Long.valueOf(36),Long.valueOf(16),Long.valueOf(9),Long.valueOf(4),Long.valueOf(1),Long.valueOf(0),Long.valueOf(1),Long.valueOf(4),Long.valueOf(9),Long.valueOf(16),Long.valueOf(36),Long.valueOf(16),Long.valueOf(9),Long.valueOf(4),Long.valueOf(1),Long.valueOf(0),Long.valueOf(1),Long.valueOf(4),Long.valueOf(9),Long.valueOf(16),Long.valueOf(36),Long.valueOf(16),Long.valueOf(9),Long.valueOf(4),Long.valueOf(1),Long.valueOf(0),Long.valueOf(1),Long.valueOf(4),Long.valueOf(9),Long.valueOf(16),Long.valueOf(36),Long.valueOf(16),Long.valueOf(9),Long.valueOf(4),Long.valueOf(1)};

        predicted(x);
    }
    public static Long[] predicted(Long[] x) throws Exception{
        //System.load("D://大二暑假项目 - 副本//matlab//mclmcrrt9_1.dll");
        Object[] result = null; // 用于保存计算结果
        MWNumericArray a = null;
        a = new MWNumericArray(x, MWClassID.DOUBLE);
        train thePlot = null; // plotter类的实例（在MatLab编译时，新建的类）
        thePlot = new train();
        result  = thePlot.forecast(1,a);
        //MWNumericArray output=new MWNumericArray(Double.valueOf(result[0].toString()),MWClassID.DOUBLE);

        MWCellArray output=(MWCellArray)result[0];

        //cellArray.numberOfElements() 获取元胞数组中元素总个数
        //MWCellArray 相当于把表格数据纵向一维展开， 每一列的数据是相连的 而封装java对象要抽出一行的数据
        //元素总个数除以列数（表具有的字段数）得到行数
        int rowNum= output.numberOfElements() ;
        //ArrayList forecastResult = new ArrayList();
        Long[] forecastResult;
        forecastResult = new Long[rowNum];
        for (int i = 1; i <= rowNum; i++) {
            Long ans = Math.round(((double[][]) output.get(i))[0][0]);
            forecastResult[i-1] = ans;
            System.out.println(ans);
        }
        System.out.println("succeed");
        System.out.println(forecastResult[0]);
        MWArray.disposeArray(a);
        MWArray.disposeArray(result);
        return forecastResult;
    }
}