<?php
	    $base64_image_content = trim($_POST['base_upload']);
	    //保存base64字符串为图片
	    //匹配出图片的格式
	    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
	        $type_conf = array(
	            'jpeg'=>'jpg',
				'jpg'=>'jpg',
	            'gif'=>'gif',
	            'bmp'=>'bmp',
	            'png'=>'png',
	            'x-icon'=>'ico',
	        );

	        $type = $type_conf[$result[2]];

	        $new_dir = './'.date('Ymd',time()).'/';
	        if (!is_dir($new_dir) && !mkdir($new_dir)){
	            echo json_encode(array('status'=>false, 'info'=>'创建目录失败'));exit;
	        }
	        
	        $new_file = $new_dir.time().'.'. $type;
	        
	        $baseDecode = base64_decode(str_replace($result[1], '', $base64_image_content));
	        if ( ! file_put_contents($new_file, $baseDecode)){
	            echo json_encode(
	                array(
	                    'status'=>false,
	                    'info'=>'亲，图片保存失败，请联系工作人员',
	                )
	            );exit;
	        }
	        echo json_encode(array('status'=>true,'info'=>'上传头像成功','img_src'=>$new_file));exit;
	    }else{
	        echo json_encode(
	            array(
	                'status'=>false,
	                'info'=>'亲，图片格式出错了哦',
	            )
	        );exit;
	    }
	     