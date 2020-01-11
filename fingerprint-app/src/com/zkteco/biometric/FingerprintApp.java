package com.zkteco.biometric;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.util.Properties;

import javax.swing.JOptionPane;

public class FingerprintApp {

	public static String FINGER_PRINT_ENDPOINT_URL;
	public static String PORT;

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
		PORT = prop.getProperty("bind-port");

		System.out.println("FINGER_PRINT_ENDPOINT_URL = " + FINGER_PRINT_ENDPOINT_URL);
	}

	public static void main(String arg[]) {
		try {
			new FingerprintApp().getPropValues();
			// the below socked is opened to make sure that only one instance of the application is running.  
			ServerSocket socket = new ServerSocket(Integer.valueOf(PORT), 10, InetAddress.getLocalHost());
			
			Login frame = new Login();
			frame.setSize(520, 250);
			frame.setLocationRelativeTo(null);
			frame.setVisible(true);
			frame.setTitle("SMC Login");
			frame.setResizable(false);
		} catch (java.net.BindException b) {
			b.printStackTrace();
			JOptionPane.showMessageDialog(null, "Application Already Running...");
		} catch (Exception e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(null, e.getMessage());
		}
	}
}
