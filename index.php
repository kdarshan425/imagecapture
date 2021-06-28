<?php
 $ch=curl_init(); 
 $image_url="https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg%22";
 $url= "http://18.117.88.232:8080/measure?imageURL=$image_url";
 curl_setopt($ch,CURLOPT_URL,$url);
//  curl_setopt($ch, CURLOPT_POST, true);
//  curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
 
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
 $response = curl_exec($ch);
 $result = json_decode($response, true);
 if($response == true){   

      echo'
     <table>
     <tr>
     <th>Body Part</th>     
     <th>measurements</th>
     </tr>
     ';

     foreach($result as $list){
        echo'
        <tr>
        <td>'.$list[0].'</td>
        <td>'.$list[1][0].'</td>        
        </tr>';
     }

     echo'     
     </table>     
     ';
    
 }
 else{
     echo"Error:" . curl_error($ch);
 }
 curl_close($ch); 
?>