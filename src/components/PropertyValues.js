/**
 * Created by matvij on 24.07.17.
 */
var Elements = {
    answer: {
        name: 'Sip code',
        single: true,
        type: 'select',
        values:[
            '200 OK',
            '183 Session Progress',
            '180 Ringing'
        ]
    },
    hangup: {
        name: 'Hangup Cause Code',
        single: true,
        type: 'select',
        values:[
            'NORMAL_CLEARING',
            'UNSPECIFIED',
            'UNALLOCATED_NUMBER',
            'NO_ROUTE_TRANSIT_NET',
            'NO_ROUTE_DESTINATION',
            'CHANNEL_UNACCEPTABLE',
            'CALL_AWARDED_DELIVERED',
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
        name: 'Log',
        single: true,
        type: 'text',
    },
    echo:{
        name: 'Milliseconds',
        single: true,
        type: 'number',
    },
    sleep:{
        name: 'Milliseconds',
        single: true,
        type: 'number',
    },
		pickup:{
			name: 'Name',
			single: true,
			type: 'text',
		},
    playback:{
        single: false,
        files:[
            'mp3',
            'wav',
            'shout',
            'tone',
            'silence'
        ]
    },
		playNdigits:{
			single: false,
			files:[
				'mp3',
				'wav',
				'shout',
				'tone',
				'silence'
			]
		},
    if:{
        single: false
    },
    switch:{
        single: false
    },
		blackList:{
			single: false
		},
    queue:{
        single: false,
    },
    queueTimer:{
        single: false
    },
    recordFile:{
        single: false,
        type:['mp3', 'mp4']
    },
    recordSession:{
        single: false,
        type:['mp3', 'mp4'],
        action:['start', 'stop']
    },
		conference:{
			single: false,
			flags:['moderator', 'join-only', 'vmute', 'mute', 'deaf', 'endconf', 'mintwo', 'nomoh']
		},
		calendar:{
			single: false
		},
		users:{
    	single: false,
			strategy: ['multiple', 'failover'],
			codecs: [ 'PCMA', 'PCMU', 'G729', 'G722', 'OPUS', 'GSM', 'ilbc', 'VP8', 'VP9', 'H264', 'H263', 'H263-1998']
		},
		outboundCall:{
    	single: false,
			strategy: ['multiple', 'failover'],
			codecs: [ 'PCMA', 'PCMU', 'G729', 'G722', 'OPUS', 'GSM', 'ilbc', 'VP8', 'VP9', 'H264', 'H263', 'H263-1998'],
			type: [{name: 'SIP Gateway', value: 'sipGateway'}, {name: 'SIP URI', value: 'sipUri'}],
			profile: ['nonreg', 'external', 'internal']
		},
		sendEmail:{
				singe: false
		},
		receiveFax:{
    	single: false
		},
	  httpRequest:{
    	single: false,
			method: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH']
		},
		park:{
    	single:false,
			auto:['in', 'out']
		},
		tts:{
    	single: false,
			provider: ['polly'],
			voice:[
				{
					language: 'Danish (da-DK)',
					male:['Mads'],
					female:['Naja']
				},
				{
					language: 'Dutch (nl-NL)',
					male:['Ruben'],
					female:['Lotte']
				},
				{
					language: 'English (Australian) (en-AU)',
					male:['Russell'],
					female:['Nicole']
				},
				{
					language: 'English (British) (en-GB)',
					male:['Brian'],
					female:['Amy', 'Emma',]
				},
				{
					language: 'English (Indian) (en-IN)',
					male:[],
					female:['Raveena']
				},
				{
					language: 'English (US) (en-US)',
					male:['Joey', 'Justin'],
					female:['Kendra', 'Kimberly', 'Salli', 'Ivy', 'Joanna']
				},
				{
					language: 'English (Welsh) (en-GB-WLS)',
					male:['Geraint'],
					female:[]
				},
				{
					language: 'French (fr-FR)',
					male:['Mathieu'],
					female:['Celine']
				},
				{
					language: 'French (Canadian) (fr-CA)',
					male:[],
					female:['Chantal']
				},
				{
					language: 'German (de-DE)',
					male:['Hans'],
					female:['Marlene', 'Vicki']
				},
				{
					language: 'Icelandic (is-IS)',
					male:['Karl'],
					female:['Dora']
				},
				{
					language: 'Italian (it-IT)',
					male:['Giorgio'],
					female:['Carla']
				},
				{
					language: 'Japanese (ja-JP)',
					male:[],
					female:['Mizuki']
				},
				{
					language: 'Norwegian (nb-NO)',
					male:[],
					female:['Liv']
				},
				{
					language: 'Polish (pl-PL)',
					male:['Jacek', 'Jan'],
					female:['Ewa', 'Maja']
				},
				{
					language: 'Portuguese (Brazilian) (pt-BR)',
					male:['Ricardo'],
					female:['Vitoria']
				},
				{
					language: 'Portuguese (European) (pt-PT)',
					male:['Cristiano'],
					female:['Ines']
				},
				{
					language: 'Romanian (ro-RO)',
					male:[],
					female:['Carmen']
				},
				{
					language: 'Russian (ru-RU)',
					male:['Maxim'],
					female:['Tatyana']
				},
				{
					language: 'Spanish (Castilian) (es-ES)',
					male:['Enrique'],
					female:['Conchita']
				},
				{
					language: 'Spanish (Latin American) (es-US)',
					male:['Miguel'],
					female:['Penelope']
				},
				{
					language: 'Swedish (sv-SE)',
					male:[],
					female:['Astrid']
				},
				{
					language: 'Turkish (tr-TR)',
					male:[],
					female:['Filiz']
				},
				{
					language: 'Welsh (cy-GB)',
					male:[],
					female:['Gwyneth']
				}
			]
		}
}

export default Elements;
