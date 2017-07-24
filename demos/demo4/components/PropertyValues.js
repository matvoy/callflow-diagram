/**
 * Created by matvij on 24.07.17.
 */
var Elements = {
    answer: {
        name: 'Sip code: ',
        type: 'select',
        values:[
            '200 OK',
            '183 Session Progress',
            '180 Ringing'
        ]
    },
    hangup: {
        name: 'Hangup Cause Code:',
        type: 'select',
        values:[
            'UNSPECIFIED',
            'UNALLOCATED_NUMBER',
            'NO_ROUTE_TRANSIT_NET',
            'NO_ROUTE_DESTINATION',
            'CHANNEL_UNACCEPTABLE',
            'CALL_AWARDED_DELIVERED',
            'NORMAL_CLEARING',
            'USER_BUSY',
            'NO_USER_RESPONSE',
            'NO_ANSWER',
            'SUBSCRIBER_ABSENT',
            'CALL_REJECTED',
            'NUMBER_CHANGED',
            'REDIRECTION_TO_NEW_DESTINATION',
            'EXCHANGE_ROUTING_ERROR',
            'DESTINATION_OUT_OF_ORDER',
            'INVALID_NUMBER_FORMAT',
            'FACILITY_REJECTED',
            'RESPONSE_TO_STATUS_ENQUIRY',
            'NORMAL_UNSPECIFIED',
            'NORMAL_CIRCUIT_CONGESTION',
            'NETWORK_OUT_OF_ORDER',
            'NORMAL_TEMPORARY_FAILURE',
            'SWITCH_CONGESTION',
            'ACCESS_INFO_DISCARDED',
            'REQUESTED_CHAN_UNAVAIL',
            'PRE_EMPTED',
            'FACILITY_NOT_SUBSCRIBED',
            'OUTGOING_CALL_BARRED',
            'INCOMING_CALL_BARRED',
            'BEARERCAPABILITY_NOTAUTH',
            'BEARERCAPABILITY_NOTAVAIL',
            'SERVICE_UNAVAILABLE',
            'BEARERCAPABILITY_NOTIMPL',
            'CHAN_NOT_IMPLEMENTED',
            'FACILITY_NOT_IMPLEMENTED',
            'SERVICE_NOT_IMPLEMENTED',
            'INVALID_CALL_REFERENCE',
            'INCOMPATIBLE_DESTINATION',
            'INVALID_MSG_UNSPECIFIED',
            'MANDATORY_IE_MISSING',
            'MESSAGE_TYPE_NONEXIST',
            'WRONG_MESSAGE',
            'IE_NONEXIST',
            'INVALID_IE_CONTENTS',
            'WRONG_CALL_STATE',
            'RECOVERY_ON_TIMER_EXPIRE',
            'MANDATORY_IE_LENGTH_ERROR',
            'PROTOCOL_ERROR',
            'INTERWORKING',
            'ORIGINATOR_CANCEL',
            'CRASH',
            'SYSTEM_SHUTDOWN',
            'LOSE_RACE',
            'MANAGER_REQUEST',
            'BLIND_TRANSFER',
            'ATTENDED_TRANSFER',
            'ALLOTTED_TIMEOUT',
            'USER_CHALLENGE',
            'MEDIA_TIMEOUT',
            'PICKED_OFF',
            'USER_NOT_REGISTERED',
            'PROGRESS_TIMEOUT',
            'GATEWAY_DOWN',
            'ABANDONED'
        ]
    },
    log:{
        type:'text'
    },
    playback:[
        {
            name:'type',
            type:'select',
            values:[
                'mp3',
                'wav',
                'shout',
                'tone',
                'silence'
            ]
        },
        {
            name:'name',
            type:'media',
        }
    ]
}

export default Elements;