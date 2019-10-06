package com.zkteco.biometric;

import javax.swing.JOptionPane;

public class FingerprintApp {
	public static void main(String arg[]) {
		try {
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
