package com.zkteco.biometric;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.Charsets;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.sling.commons.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.zkteco.biometric.models.Fingerprint;
import com.zkteco.biometric.models.FingerprintEnrollment;
import com.zkteco.biometric.models.FingerprintVerification;

public class SmcService {

	public static String TOKEN;

	public void signin(String username, String password) throws Exception {

		URIBuilder builder = new URIBuilder(FingerprintApp.FINGER_PRINT_ENDPOINT_URL + "/signin");

		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(builder.build());

		String json = "{ \"username\":\"" + username + "\" ," + "\"password\":\"" + password + "\"}";

		StringEntity entity = new StringEntity(json);
		post.setEntity(entity);
		post.setHeader("Accept", "application/json");
		post.setHeader("Content-type", "application/json");

//		post.setEntity(new UrlEncodedFormEntity(urlParameters));
		System.out.println("Sending Post Request to  " + builder.getPath().toString());
		HttpResponse response = client.execute(post);

		if (response.getStatusLine().getStatusCode() == 401) {
			throw new Exception("Invalid username or password");
		} else if (response.getStatusLine().getStatusCode() != 200) {
			throw new Exception("system error : " + response.getStatusLine().getReasonPhrase());
		}

		HttpEntity responseEntity = response.getEntity();
		Header encodingHeader = responseEntity.getContentEncoding();

		// you need to know the encoding to parse correctly
		Charset encoding = encodingHeader == null ? StandardCharsets.UTF_8
				: Charsets.toCharset(encodingHeader.getValue());

		// use org.apache.http.util.EntityUtils to read json as string
		String jwt = EntityUtils.toString(responseEntity, encoding);
		JSONObject jwtToken;
		jwtToken = new JSONObject(jwt);
		TOKEN = (String) jwtToken.get("accessToken");

		System.out.println("Response Code : " + response.getStatusLine().getStatusCode());
	}

	public FingerprintEnrollment getNextEnrollment() throws IOException, URISyntaxException, RuntimeException {
		BufferedReader rd = null;
		URIBuilder builder = new URIBuilder(
				FingerprintApp.FINGER_PRINT_ENDPOINT_URL + "/fingerprint/getnextenrollment");
		HttpClient client = HttpClientBuilder.create().build();
		HttpGet request = new HttpGet(builder.build());
		// add request header

		request.setHeader("Authorization", "Bearer " + TOKEN);
		System.out.println("Sending GET Request to  " + builder.getPath().toString());
		HttpResponse response = client.execute(request);

		if (response.getStatusLine().getStatusCode() == 401 || response.getStatusLine().getStatusCode() == 403) {
			throw new RuntimeException(
					"You don't have privileges to perform this action.. please contact administrator");
		}

		if (response.getStatusLine().getStatusCode() == 404) {
			throw new RuntimeException("No Fingerprint Registration Request is issued");
		}

		rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), "utf-8"));

		StringBuilder result = new StringBuilder();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		if (result == null || result.toString().isEmpty()) {
			return null;
		}
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//			JSONObject jsonResponse = new JSONObject(resourceResponse);

		FingerprintEnrollment fingerprintEnrollment = gson.fromJson(result.toString(), FingerprintEnrollment.class);
		return fingerprintEnrollment;

	}

	public void updateEnrollmentStatusMessage(String message) throws IOException, URISyntaxException, RuntimeException {
		URIBuilder builder = new URIBuilder(
				FingerprintApp.FINGER_PRINT_ENDPOINT_URL + "/fingerprint/updateenrollmentMessage");

		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(builder.build());
		post.setHeader("Authorization", "Bearer " + TOKEN);
		StringEntity entity = new StringEntity(message);
		post.setEntity(entity);
//		    post.setHeader("Accept", "application/json");
		post.setHeader("Content-type", "text/plain");
//			List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
//			urlParameters.add(new BasicNameValuePair("fingerTempate", Arrays.toString(template)));

//			post.setEntity(new UrlEncodedFormEntity(urlParameters));
		System.out.println("Sending Post Request to  " + builder.getPath().toString());
		HttpResponse response = client.execute(post);

		if (response.getStatusLine().getStatusCode() == 401 || response.getStatusLine().getStatusCode() == 403) {
			throw new RuntimeException(
					"You Do not have Privileges to perform this action.. please try to relogin with authorized user");
		}
		System.out.println("Response Code : " + response.getStatusLine().getStatusCode());

	}

	public String registerCitizenFingerprintStep2(long citizenId, byte[] template)
			throws IOException, URISyntaxException, RuntimeException {
		BufferedReader rd = null;
		URIBuilder builder = new URIBuilder(
				FingerprintApp.FINGER_PRINT_ENDPOINT_URL + "/" + citizenId + "/fingerprint/enrollmentstep2");

		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(builder.build());
		post.setHeader("Authorization", "Bearer " + TOKEN);
		String base64String = Base64.encodeBase64String(template);
		String json = "{ \"template\":\"" + base64String + "\"}";
		StringEntity entity = new StringEntity(json);
		post.setEntity(entity);
//		    post.setHeader("Accept", "application/json");
		post.setHeader("Content-type", "application/json");
//			List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
//			urlParameters.add(new BasicNameValuePair("fingerTempate", Arrays.toString(template)));

//			post.setEntity(new UrlEncodedFormEntity(urlParameters));
		System.out.println("Sending Post Request to  " + builder.getPath().toString());
		HttpResponse response = client.execute(post);

		if (response.getStatusLine().getStatusCode() == 401 || response.getStatusLine().getStatusCode() == 403) {
			throw new RuntimeException(
					"You Do not have Privileges to perform this action.. please try to relogin with authorized user");
		}
		System.out.println("Response Code : " + response.getStatusLine().getStatusCode());

		rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		return result.toString();

	}

	public FingerprintVerification getNextVerification() throws IOException, URISyntaxException, RuntimeException {
		BufferedReader rd = null;
		URIBuilder builder = new URIBuilder(
				FingerprintApp.FINGER_PRINT_ENDPOINT_URL + "/fingerprint/getnextenrollment");
		HttpClient client = HttpClientBuilder.create().build();
		HttpGet request = new HttpGet(builder.build());
		// add request header

		request.setHeader("Authorization", "Bearer " + TOKEN);
		System.out.println("Sending GET Request to  " + builder.getPath().toString());
		HttpResponse response = client.execute(request);

		if (response.getStatusLine().getStatusCode() == 401 || response.getStatusLine().getStatusCode() == 403) {
			throw new RuntimeException(
					"You don't have privileges to perform this action.. please contact administrator");
		}

		if (response.getStatusLine().getStatusCode() == 404) {
			throw new RuntimeException("No Fingerprint Verification Request is issued");
		}

		rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), "utf-8"));

		StringBuilder result = new StringBuilder();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		if (result == null || result.toString().isEmpty()) {
			return null;
		}
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//			JSONObject jsonResponse = new JSONObject(resourceResponse);

		FingerprintVerification fingerprintVerification = gson.fromJson(result.toString(),
				FingerprintVerification.class);
		return fingerprintVerification;

	}

	public void verifyCitizenFingerprintStep2(long citizenId, boolean verified)
			throws IOException, URISyntaxException, RuntimeException {
		URIBuilder builder = new URIBuilder(
				FingerprintApp.FINGER_PRINT_ENDPOINT_URL + "/" + citizenId + "/fingerprint/verifystep2");

		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(builder.build());
		post.setHeader("Authorization", "Bearer " + TOKEN);
		StringEntity entity = new StringEntity(String.valueOf(verified));
		post.setEntity(entity);
//		    post.setHeader("Accept", "application/json");
		post.setHeader("Content-type", "text/plain");
//			List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
//			urlParameters.add(new BasicNameValuePair("fingerTempate", Arrays.toString(template)));

//			post.setEntity(new UrlEncodedFormEntity(urlParameters));
		System.out.println("Sending Post Request to  " + builder.getPath().toString());
		HttpResponse response = client.execute(post);

		if (response.getStatusLine().getStatusCode() == 401 || response.getStatusLine().getStatusCode() == 403) {
			throw new RuntimeException(
					"You Do not have Privileges to perform this action.. please try to relogin with authorized user");
		}
		System.out.println("Response Code : " + response.getStatusLine().getStatusCode());

	}
//
//	public byte[] getCitizenFingerTemplate(Long nationalId) throws IOException, URISyntaxException {
//		URIBuilder builder = new URIBuilder(FingerprintApp.FINGER_PRINT_ENDPOINT_URL);
//		builder.setParameter("nationalId", String.valueOf(nationalId));
//
//		HttpClient client = HttpClientBuilder.create().build();
//		HttpGet request = new HttpGet(builder.build());
//		// add request header
//
//		request.setHeader("Authorization", "Bearer " + TOKEN);
//		System.out.println("Sending GET Request to  " + builder.getPath().toString());
//		HttpResponse response = client.execute(request);
//
//		if (response.getStatusLine().getStatusCode() == 401 || response.getStatusLine().getStatusCode() == 403) {
//			throw new RuntimeException(
//					"You don't have privileges to perform this action.. please contact administrator");
//		}
//
//		if (response.getStatusLine().getStatusCode() == 404) {
//			throw new RuntimeException("citizen[National-ID = " + nationalId + "] isn't found");
//		}
//		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
//
//		StringBuffer result = new StringBuffer();
//		String line = "";
//		while ((line = rd.readLine()) != null) {
//			result.append(line);
//		}
//		if (result == null || result.toString().isEmpty()) {
//			throw new RuntimeException(
//					"No fingerprint is registered for this citizen[National-ID = " + nationalId + "]");
//		}
//		return Base64.decodeBase64(result.toString());
//	}
//
//	public String createCitizenFingerTemplate(Long nationalId, byte[] template) throws IOException, URISyntaxException {
//
//		URIBuilder builder = new URIBuilder(FingerprintApp.FINGER_PRINT_ENDPOINT_URL);
//		builder.setParameter("nationalId", String.valueOf(nationalId));
//
//		HttpClient client = HttpClientBuilder.create().build();
//		HttpPost post = new HttpPost(builder.build());
//
//		post.setHeader("Authorization", "Bearer " + TOKEN);
//		String base64String = Base64.encodeBase64String(template);
//
//		String json = "{ \"fingerprintTemplate\":\"" + base64String + "\"}";
//		StringEntity entity = new StringEntity(json);
//		post.setEntity(entity);
////	    post.setHeader("Accept", "application/json");
//		post.setHeader("Content-type", "application/json");
////		List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
////		urlParameters.add(new BasicNameValuePair("fingerTempate", Arrays.toString(template)));
//
////		post.setEntity(new UrlEncodedFormEntity(urlParameters));
//		System.out.println(
//				"Sending Post Request to  " + builder.getPath().toString() + "\nfingerTempate = " + base64String);
//		HttpResponse response = client.execute(post);
//
//		if (response.getStatusLine().getStatusCode() == 401 || response.getStatusLine().getStatusCode() == 403) {
//			throw new RuntimeException(
//					"You Do not have Privileges to perform this action.. please try to relogin with authorized user");
//		}
//		System.out.println("Response Code : " + response.getStatusLine().getStatusCode());
//
//		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
//
//		StringBuffer result = new StringBuffer();
//		String line = "";
//		while ((line = rd.readLine()) != null) {
//			result.append(line);
//		}
//		return result.toString();
//	}
//
//	public void updateCitizenFingerTemplate(Long nationalId, byte[] template) throws IOException, URISyntaxException {
//		URIBuilder builder = new URIBuilder(FingerprintApp.FINGER_PRINT_ENDPOINT_URL);
//		builder.setParameter("nationalId", String.valueOf(nationalId));
//
//		HttpClient client = HttpClientBuilder.create().build();
//		HttpPut put = new HttpPut(builder.build());
//
//		// add header
//		put.setHeader("Authorization", "Bearer " + TOKEN);
//		List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
//		urlParameters.add(new BasicNameValuePair("fingerTempate", template.toString()));
//
//		put.setEntity(new UrlEncodedFormEntity(urlParameters));
//		System.out.println("Sending Put Request to  " + builder.getPath().toString() + "\nfingerTempate = " + template);
//		HttpResponse response = client.execute(put);
//		System.out.println("Response Code : " + response.getStatusLine().getStatusCode());
//		if (response.getStatusLine().getStatusCode() == 401) {
//			throw new RuntimeException(
//					"You Do not have Privileges to perform this action.. please try to relogin with the authorized user");
//		}
//		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
//
//		StringBuffer result = new StringBuffer();
//		String line = "";
//		while ((line = rd.readLine()) != null) {
//			result.append(line);
//		}
//		System.out.println("result  = " + result.toString());
//	}
//
//	public void deleteCitizenFingerTemplate(Long nationalId, byte[] template) throws IOException, URISyntaxException {
//		URIBuilder builder = new URIBuilder(FingerprintApp.FINGER_PRINT_ENDPOINT_URL);
//		builder.setParameter("nationalId", String.valueOf(nationalId));
//
//		HttpClient client = HttpClientBuilder.create().build();
//		HttpDelete delete = new HttpDelete(builder.build());
//
//		delete.setHeader("Authorization", "Bearer " + TOKEN);
//		System.out.println("Sending Delete Request to  " + builder.getPath().toString());
//		HttpResponse response = client.execute(delete);
//		System.out.println("Response Code : " + response.getStatusLine().getStatusCode());
//		if (response.getStatusLine().getStatusCode() == 401) {
//			throw new RuntimeException(
//					"You Do not have Privileges to perform this action.. please try to relogin with the authorized user");
//		}
//		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
//
//		StringBuffer result = new StringBuffer();
//		String line = "";
//		while ((line = rd.readLine()) != null) {
//			result.append(line);
//		}
//		System.out.println("result  = " + result.toString());
//	}
}
