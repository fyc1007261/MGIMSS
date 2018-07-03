import java.awt.BorderLayout;
import java.awt.Container;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;

import com.iflytek.cloud.speech.RecognizerListener;
import com.iflytek.cloud.speech.RecognizerResult;
import com.iflytek.cloud.speech.SpeechConstant;
import com.iflytek.cloud.speech.SpeechError;
import com.iflytek.cloud.speech.SpeechRecognizer;
import com.iflytek.cloud.speech.SpeechUtility;

public class iftry2 extends JFrame
{
    private static final long serialVersionUID = 1L;
    JPanel panelNorth, panelSouth;
    JTextArea textArea;
    JButton button_start, button_stop;
    private SpeechRecognizer mIat;


    public String resulttext = "";
    public static void main(String[] args)
    {
        new iftry2();

    }

    public iftry2()
    {
        initIfly();
        Container con = this.getContentPane();
        con.setLayout(new BorderLayout());
        this.setSize(500, 300);
        this.setLocationRelativeTo(null);
        this.setResizable(true);
        this.setDefaultCloseOperation(3);
        this.setLayout(new BorderLayout());
        setFrame();
        this.add(panelSouth, BorderLayout.SOUTH);
        this.add(panelNorth, BorderLayout.NORTH);
        setVisible(true);
    }

    public void initIfly()
    {
        mIat = SpeechRecognizer.createRecognizer();
        SpeechUtility.createUtility("appid=5b398665");
        // 例如SpeechUtility.createUtility("appid=12345678");
    }

    public void setFrame()
    {
        panelNorth = new JPanel();
        panelSouth = new JPanel();
        textArea = new JTextArea(30, 30);
        button_start = new JButton("开始");
        button_start.addActionListener(e ->
        {
            setting();
            textArea.setText("");
            if (!mIat.isListening()) mIat.startListening(recognizerListener);
            else mIat.stopListening();
        });
        button_stop = new JButton("停止");
        button_stop.addActionListener(e ->
        {
            mIat.stopListening();
            iatSpeechInitUI();
        });
        panelNorth.add(textArea);
        panelSouth.add(button_start);
        panelSouth.add(button_stop);
    }

    void setting()// 属性设置
    {
        final String engType = "cloud";
        mIat.setParameter(SpeechConstant.ENGINE_TYPE, "cloud");
        mIat.setParameter(SpeechConstant.SAMPLE_RATE, "16000");//
        mIat.setParameter(SpeechConstant.NET_TIMEOUT, "20000");
        mIat.setParameter(SpeechConstant.KEY_SPEECH_TIMEOUT, "60000");
        mIat.setParameter(SpeechConstant.LANGUAGE, "zh_cn");// 语言en_us(英语)
        // zh_cn(中文)
        mIat.setParameter(SpeechConstant.ACCENT, "mandarin");
        mIat.setParameter(SpeechConstant.DOMAIN, "iat");
        mIat.setParameter(SpeechConstant.VAD_BOS, "5000");
        mIat.setParameter(SpeechConstant.VAD_EOS, "1800");
        mIat.setParameter(SpeechConstant.ASR_NBEST, "1");
        mIat.setParameter(SpeechConstant.ASR_WBEST, "1");
        mIat.setParameter(SpeechConstant.ASR_PTT, "0");// 标点符号 0(关) 1(开)
        mIat.setParameter(SpeechConstant.RESULT_TYPE, "plain"); // 返回数据格式
        // plain或者jason
        mIat.setParameter(SpeechConstant.ASR_AUDIO_PATH, null);
    }

    private RecognizerListener recognizerListener = new RecognizerListener()
    {
        @Override
        public void onBeginOfSpeech()
        {
            button_start.setText("听写中...");
            button_start.setEnabled(false);
        }

        @Override
        public void onEndOfSpeech()
        {}

        /**
         * 获取听写结果. 获取RecognizerResult类型的识别结果，并对结果进行累加，显示到Area里
         */
        @Override
        public void onResult(RecognizerResult results, boolean islast)
        {

            String text = results.getResultString();
            textArea.append(text);
            text = textArea.getText();
            resulttext = text;
            int resultKaiji = resulttext.indexOf("空调开机");
            int resultDenglai = resulttext.indexOf("登来");
            if (islast)
            {
                iatSpeechInitUI();
                //System.out.println(resultKaiji);
                if (resultKaiji >= 0)
                    System.out.println("空调开机");
                if (resultDenglai >= 0)
                    System.out.println("灯来");
            }
        }

        @Override
        public void onVolumeChanged(int volume)
        {}

        @Override
        public void onError(SpeechError error)
        {
            if (null != error)
            {
                textArea.setText(error.getErrorDescription(true));
                iatSpeechInitUI();
            }
        }

        @Override
        public void onEvent(int eventType, int arg1, int agr2, String msg)
        {}
    };

    public void iatSpeechInitUI()
    {
        button_start.setEnabled(true);
        button_start.setText("开始听写");
    }

}

