package com.zkteco.biometric;

import java.awt.BorderLayout;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JRadioButton;
import javax.swing.JTextField;

class Login extends JFrame implements ActionListener, KeyListener {
	JButton SUBMIT;
//	JPanel panel;
	JLabel label1, label2;
	JRadioButton radioEnroll = null;
	JRadioButton radioVerify = null;
	final JTextField text1, text2;

	private SmcService smcService = new SmcService();

	Login() {
		this.setLayout(null);
		label1 = new JLabel();
		label1.setText("Username :");
		label1.setFont(new Font(Font.SERIF, Font.PLAIN, 19));
		label1.setBounds(90, 20, 100, 30);
		
		
		text1 = new JTextField(50);
//		text1.setText("admin");
		text1.setBounds(190, 20, 200, 30);
		
		
		label2 = new JLabel();
		label2.setText("Password :");
		label2.setFont(new Font(Font.SERIF, Font.PLAIN, 19));
		label2.setBounds(90, 70, 100, 30);
		
		
		text2 = new JPasswordField(50);
//		text2.setText("admin");
		text2.setBounds(190, 70, 200, 30);
		
		radioVerify = new JRadioButton("Verify", true);
		radioVerify.setBounds(140, 110, 100, 30);
		radioVerify.setFont(new Font(Font.DIALOG_INPUT, Font.BOLD, 19));
		radioEnroll = new JRadioButton("Enroll");
		radioEnroll.setBounds(280, 110, 100, 30);
		radioEnroll.setFont(new Font(Font.DIALOG_INPUT, Font.BOLD, 19));
		  
        
        ButtonGroup group = new ButtonGroup();
        group = new ButtonGroup();
        group.add(radioVerify);
        group.add(radioEnroll);
		
		
		SUBMIT = new JButton("Login");
		SUBMIT.setBounds(190, 160, 100, 30);
//		panel = new JPanel(new GridLayout(4, 1));
		this.add(label1);
		this.add(text1);
		this.add(label2);
		this.add(text2);
		this.add(radioVerify);
		this.add(radioEnroll);
		this.add(SUBMIT);
//		add(panel, BorderLayout.CENTER);
		SUBMIT.addActionListener(this);
		SUBMIT.addKeyListener(this);
		setTitle("LOGIN");
	}
	public void signin() {
		String username = text1.getText();
		String password = text2.getText();

		try {
			smcService.signin(username, password);
			if (radioVerify.isSelected()) {
				Verification verificationPage = new Verification();
				setVisible(false);
				verificationPage.launchFrame();
			}else {
				Enroll enrollPage = new Enroll();
				setVisible(false);
				enrollPage.launchFrame();
			}
			
		} catch (Exception e) {
			
			JOptionPane.showMessageDialog(this, e.getMessage(),"Login Error" , JOptionPane.ERROR_MESSAGE);
			e.printStackTrace();
		}
//		if (value1.equals("admin") && value2.equals("admin")) {

//			JLabel label = new JLabel("Welcome:" + value1);
//			page.getContentPane().add(label);
//		} else {
//			System.out.println("enter the valid username and password");
//			JOptionPane.showMessageDialog(this, "Incorrect login or password", "Error", JOptionPane.ERROR_MESSAGE);
//		}
	}
	public void actionPerformed(ActionEvent ae) {
		signin();
	}

	@Override
	public void keyPressed(KeyEvent e) {
		if (e.getKeyCode() == KeyEvent.VK_ENTER) {
			signin();
		}
	}

	@Override
	public void keyReleased(KeyEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void keyTyped(KeyEvent e) {
		// TODO Auto-generated method stub

	}
}
