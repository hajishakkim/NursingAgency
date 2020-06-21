<?php 

class TimesheetModel{
    public function processEvents($events, $viewType)
    {
        $result = array();

        foreach($events as $event){
            $data['id']         = $event['id'];
            $data['text']       = $event['event_title'];
            $data['start']      = $event['start_time'];
            $data['end']        = $event['end_time'];
            $data['comment']    = $event['comments'];

            if($viewType == 'client'){
                $data['resource']   = $event['client_id'];
                $data['curesponse'] = $event['candidate_id'];
            }else{
                $data['resource']   = $event['candidate_id'];
                $data['curesponse'] = $event['client_id'];
            }

            array_push($result, $data);
        }

        return $result;
    }

    public function processResources($resource, $viewType)
    {
        $clients = array();
        $candidates = array();
        $result = array();

        foreach($resource['modules'] as $modules){
            foreach($modules as $key => $data){
                $refData = array('id' => strval($data['id']), 'name' => $data['label']);

                if($data['module'] == 'client'){
                    array_push($clients, $refData);
                }

                if($data['module'] == 'candidates'){
                    array_push($candidates, $refData);
                }
            }
        }

        if($viewType == 'client'){
            $result = array(
                'curesponse' => $candidates,
                'resource' => $clients,
            );
        }else{
            $result = array(
                'curesponse' => $clients,
                'resource' => $candidates,
            );
        }

        return $result;
    }
}

