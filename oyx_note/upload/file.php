<?php
	if($_FILES['file_name']['error']!=0 || !$_FILES || !$_FILES['file_name']){
		echo json_encode(array('status'=>false, 'info'=>'没有选择文件'));exit;
	}
	// var_dump($_FILES);
	$new_dir = './'.date('Ymd',time()).'/';
	if (!is_dir($new_dir) && !mkdir($new_dir)){
	    echo json_encode(array('status'=>false, 'info'=>'创建目录失败'));exit;
	}
	$type = $_FILES['file_name']['type'];
	$type = substr($type, strpos($type,'/')+1);
	if(move_uploaded_file($_FILES['file_name']['tmp_name'], $new_dir.time().'.'.$type)){
		echo json_encode(array('status'=>true, 'info'=>'上传成功'));exit;
	} else {
		echo json_encode(array('status'=>false, 'info'=>'上传失败'));exit;
	}
	     