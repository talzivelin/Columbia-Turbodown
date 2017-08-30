<?php
require 'database.php';

$peabody = new Peabody();
$errors = array();
$form = array();
$form['field26998274'] = ''; // first_name
$form['field26998258']= ''; // last name
$form['field26998264']= ''; // email
$form['field26998249']= ''; // phone
$form['field26998246']= ''; // zipcode
$form['field26998275']= ''; // departure_city
$form['field26998810']= 0;

$form = array_merge( $form , $_POST );
/**
* 
*/
class Peabody {
	var $date = '';
	var $begin_date = '';
	var $end_date = '';
	var $db;
	var $errors = array();
	var $success = false;
	
	function __construct(){
		$tz_object = new DateTimeZone("America/Los_Angeles"); 
		$datetime = new DateTime(); 
		$datetime->setTimezone($tz_object); 

		$this->date = $datetime->format('U');

		$datetime->setTime('00', '00', '00'); 
		$this->begin_date = $datetime->format('U');
		
		$datetime->setTime('24', '00', '00'); 
		$this->end_date = $datetime->format('U');

		return $this->init();
	}
	
	function init(){

		if (isset($_POST['form'])) {
			$insert = false;
			if ($_SERVER['HTTP_HOST'] == 'localhost:8888') {
				$this->db = new mySqldb('root', 'root', 'localhost', 'turbodown_sweeps');
			} else {
				$this->db = new mySqldb('turbodown_sweeps', 'q4IlKhbK', 'localhost', 'turbodown_sweeps');
			}
			// $this->db = new mySqldb('root', 'root', 'localhost', 'peabody_sweeps');
			$this->validate($_POST);
			if (count($this->errors)) {
				// return $this->success;
			} else {
				
				$vars = array();
				$vars[] = filter_var($_POST['field26998264'],FILTER_SANITIZE_EMAIL); // email
				$vars[] = filter_var($_POST['field26998274'],FILTER_SANITIZE_STRING); //first name
				$vars[] = filter_var($_POST['field26998258'],FILTER_SANITIZE_STRING); // last name
				$vars[] = filter_var($_POST['field26998249'],FILTER_SANITIZE_STRING); // phone
				$vars[] = filter_var($_POST['field26998246'],FILTER_SANITIZE_STRING); // zipcode
				$vars[] = filter_var($_POST['field26998275'],FILTER_SANITIZE_STRING); // departure_city
				
				$vars[] = $this->date;
				
				if (isset($_POST['field26998810'])) { // accept terms
					$vars[] = 1;
				} else {
					$vars[] = 0;
				}
				
				$sql = "INSERT INTO entries (email, first_name, last_name, phone, zipcode, departure_city, Time, accept_terms) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

				$insert = $this->db->insertRow($sql, $vars);

				if ($insert) {
					$this->success = true;
					// header('Location: http://viewfinder.expedia.com/Peabodysherman/thankyou.html');
				}
			}
		}
		if (isset($_POST) && isset($_POST['ajax']) && $_POST['ajax'] == 1) {
			$response = array();
			$response['success'] = $this->success;
			$response['errors'] = $this->errors;
			echo json_encode($response);
			die();
		}
		return $this->success;
	}
	
	function validate($formdata){
		$errors = array();
		$required = array(
			"field26998274"=>"Please enter your first name.",
			"field26998258"=>"Please enter your last name.",
			"field26998264"=>"Please enter your email address.",
			// "field26998249"=>"Please enter your phone number.",
			"field26998246"=>"Please enter your zip code.",
			"field26998810"=>"Please accept the terms and conditions.",
			"field26998275"=>"Please choose a departure city.",
		);

	
		foreach ($required as $key => $message) {
			if (!array_key_exists($key, $formdata) || $formdata[$key] == '') {
				$errors[$key] = $message;
			}
		}
		
		$options['options'] = array('regexp' => '/^\(\d{3}\) \d{3}-\d{4}$/');

		if (isset($required['field26998249']) && !array_key_exists('field26998249', $errors) && strlen($formdata['field26998249']) < 7 || strlen($formdata['field26998249']) > 20 ) {
			$errors['field26998249'] = "Please verify your phone number.";
		}
		if (!array_key_exists('field26998264', $errors)) {
			$existing_today = false;
			// email was set, now we validate
			if (!filter_var($formdata['field26998264'], FILTER_VALIDATE_EMAIL)) {
				$errors['field26998264'] = 'This email address is invalid.';
			} else {
				$email = $formdata['field26998264'];
				$begin = $this->begin_date;
				$end = $this->end_date;
				
				$where = "SELECT * FROM entries WHERE Time > $begin AND Time < $end AND email =?";

				$existing_today = $this->db->getRows($where, array($email));

				if (is_array($existing_today) && count($existing_today)) {
					$errors['existing_today'] = "You've already submitted once today.";
				}
			}
		}
		$this->errors = $errors;
		return $this->errors;
	}
}

