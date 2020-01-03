package com.zkteco.biometric;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.swing.JOptionPane;

public class FingerprintApp {


	public static String FINGER_PRINT_ENDPOINT_URL ;
	public static String LOGIN_ENDPOINT_URL ;

	public void getPropValues() throws IOException {
		InputStream inputStream = null;
			Properties prop = new Properties();
			String propFileName = "config.txt";

			inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(propFileName);
			
			if (inputStream != null) {
				prop.load(inputStream);
			} else {
				throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
			}

			FINGER_PRINT_ENDPOINT_URL = prop.getProperty("fingerprint-endpoint-url");
			LOGIN_ENDPOINT_URL = prop.getProperty("fingerprint-signin-url");

			System.out.println("FINGER_PRINT_ENDPOINT_URL = " + FINGER_PRINT_ENDPOINT_URL);
			System.out.println("LOGIN_ENDPOINT_URL = " + LOGIN_ENDPOINT_URL);
	}

	public static void main(String arg[]) {
		try {
			new FingerprintApp().getPropValues();
			Login frame = new Login();
			frame.setSize(520, 250);
			frame.setLocationRelativeTo(null);
			frame.setVisible(true);
			frame.setTitle("SMC Login");
			frame.setResizable(false);
		} catch (Exception e) {
			JOptionPane.showMessageDialog(null, e.getMessage());
		}
	}
}
