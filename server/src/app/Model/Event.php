<?php
/*
  Description of Event Model
  @author Pramod Rauniyar <pramod.rauniyar@gmail.com>

  Model/Event.php

*/

namespace app\Model;

//Definiation of the Event Class
class Event extends \Model
{
    //Event Properties
	public $name;
	public $description;
	public $start_datetime;
	public $end_datetime;
	protected $creation_datetime;
	protected $modification_datetime;
    private $db;

    //Event __construct
    //setting db connection
    public function __construct($db)
    {
        $this->db = $db;
    }

	// get and set NAME
	public function setName($name)
	{
		$this->name = $name;
	}
	public function getName()
	{
		return $this->name;
	}
	// get and set DESCRIPTION
	public function setDescriptione($description)
	{
		$this->description = $description;
	}
	public function getDescriptione()
	{
		return $this->description;
	}
	// get and set start datatime
	public function setStartDateTime($value)
	{
		$this->start_datetime = $value;
	}
	public function getStartDateTime()
	{
		return $this->start_datetime;
	}
	// get and set end datatime
	public function setEndDateTime($value)
	{
		$this->end_datetime = $value;
	}
	public function getEndDateTime()
	{
		return $this->end_datetime;
	}
    //for checking if event exist or not
    // return true if exist else false
	public function isEventExist($id)
	{    
		  $sql = "SELECT * FROM events where id = ?";
          $result = $this->db->executeQuery($sql,array((int) $id));
		  $d = $result->fetch();
		  return (!$d)?true:false;;
	} 


	
}