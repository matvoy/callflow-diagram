/**
 * Created by matvij on 24.07.17.
 */
var Elements = {
		webitelParams: {
			media: null,
			mediaArr: [],
			calendar: null,
			calendarArr: [],
			acd: null,
			acdArr: [],
			directory: null,
			directoryArr: [],
			gateway: null,
			gatewayArr: []
		},
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
            'wav',
						'mp3',
            'shout',
            'tone',
            'silence'
        ]
    },
		playNdigits:{
			single: false,
			files:[
				'wav',
				'mp3',
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
		transfer:{
			single: false,
			context:['default', 'public']
		},
		calendar:{
			single: false
		},
		bridge:{
    	single: false,
			strategy: ['multiple', 'failover'],
			codecs: [ 'PCMA', 'PCMU', 'G729', 'G722', 'OPUS', 'GSM', 'ilbc', 'VP8', 'VP9', 'H264', 'H263', 'H263-1998'],
			type: [{name: 'SIP Gateway', value: 'sipGateway'}, {name: 'SIP URI', value: 'sipUri'}, {name: 'User', value: 'user'}],
			mediaType: [ 'wav', 'mp3', 'shout',	'tone',	'silence'],
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
		variables:{
    	single: false,
			action:[ 'setVar', 'unSet', 'exportVars']
		},
		voicemail:{
    	single: false,
			action: ['leave', 'check']
		},
		customCode:{
			single: false
		},
		exists:{
			single: false,
			resource:['media', 'account', 'queue', 'dialer'],
			type: ['mp3', 'wav']
		},
		tts:{
    	single: false,
			textType:['text', 'ssml'],
			providers: [
				{
					name: 'polly',
					voice: [
						{
							language: 'Danish (da-DK)',
							male: ['Mads'],
							female: ['Naja']
						},
						{
							language: 'Dutch (nl-NL)',
							male: ['Ruben'],
							female: ['Lotte']
						},
						{
							language: 'English (Australian) (en-AU)',
							male: ['Russell'],
							female: ['Nicole']
						},
						{
							language: 'English (British) (en-GB)',
							male: ['Brian'],
							female: ['Amy', 'Emma',]
						},
						{
							language: 'English (Indian) (en-IN)',
							male: [],
							female: ['Raveena']
						},
						{
							language: 'English (US) (en-US)',
							male: ['Joey', 'Justin'],
							female: ['Kendra', 'Kimberly', 'Salli', 'Ivy', 'Joanna']
						},
						{
							language: 'English (Welsh) (en-GB-WLS)',
							male: ['Geraint'],
							female: []
						},
						{
							language: 'French (fr-FR)',
							male: ['Mathieu'],
							female: ['Celine']
						},
						{
							language: 'French (Canadian) (fr-CA)',
							male: [],
							female: ['Chantal']
						},
						{
							language: 'German (de-DE)',
							male: ['Hans'],
							female: ['Marlene', 'Vicki']
						},
						{
							language: 'Icelandic (is-IS)',
							male: ['Karl'],
							female: ['Dora']
						},
						{
							language: 'Italian (it-IT)',
							male: ['Giorgio'],
							female: ['Carla']
						},
						{
							language: 'Japanese (ja-JP)',
							male: [],
							female: ['Mizuki']
						},
						{
							language: 'Norwegian (nb-NO)',
							male: [],
							female: ['Liv']
						},
						{
							language: 'Polish (pl-PL)',
							male: ['Jacek', 'Jan'],
							female: ['Ewa', 'Maja']
						},
						{
							language: 'Portuguese (Brazilian) (pt-BR)',
							male: ['Ricardo'],
							female: ['Vitoria']
						},
						{
							language: 'Portuguese (European) (pt-PT)',
							male: ['Cristiano'],
							female: ['Ines']
						},
						{
							language: 'Romanian (ro-RO)',
							male: [],
							female: ['Carmen']
						},
						{
							language: 'Russian (ru-RU)',
							male: ['Maxim'],
							female: ['Tatyana']
						},
						{
							language: 'Spanish (Castilian) (es-ES)',
							male: ['Enrique'],
							female: ['Conchita']
						},
						{
							language: 'Spanish (Latin American) (es-US)',
							male: ['Miguel'],
							female: ['Penelope']
						},
						{
							language: 'Swedish (sv-SE)',
							male: [],
							female: ['Astrid']
						},
						{
							language: 'Turkish (tr-TR)',
							male: [],
							female: ['Filiz']
						},
						{
							language: 'Welsh (cy-GB)',
							male: [],
							female: ['Gwyneth']
						}
					]
				},
				{
					name: 'microsoft',
					voice: [
						{
							language: 'ar-EG*',
							gender: 'Female'
						},
						{
							language: 'ar-SA',
							gender: 'Male'
						}, {
							language: 'ca-ES',
							gender: 'Female'
						}, {
							language: 'cs-CZ',
							gender: 'Male'
						},
						{
							language: 'da-DK',
							gender: 'Female'
						},
						{
							language: 'de-AT',
							gender: 'Male'
						},
						{
							language: 'de-CH',
							gender: 'Male'
						},
						{
							language: 'de-DE',
							gender: 'Female'
						},
						{
							language: 'de-DE',
							gender: 'Male'
						},
						{
							language: 'el-GR',
							gender: 'Male'
						},
						{
							language: 'en-AU',
							gender: 'Female'
						},
						{
							language: 'en-CA',
							gender: 'Female'
						},
						{
							language: 'en-GB',
							gender: 'Female'
						},
						{
							language: 'en-GB',
							gender: 'Male'
						},
						{
							language: 'en-IE',
							gender: 'Male'
						},
						{
							language: 'en-IN',
							gender: 'Female'
						},
						{
							language: 'en-IN',
							gender: 'Male'
						},
						{
							language: 'en-US',
							gender: 'Female'
						},
						{
							language: 'en-US',
							gender: 'Male'
						},
						{
							language: 'es-ES',
							gender: 'Female'
						},
						{
							language: 'es-ES',
							gender: 'Male'
						},
						{
							language: 'es-MX',
							gender: 'Female'
						},
						{
							language: 'es-MX',
							gender: 'Male'
						},
						{
							language: 'fi-FI',
							gender: 'Female'
						},
						{
							language: 'fr-CA',
							gender: 'Female'
						},
						{
							language: 'fr-CH',
							gender: 'Male'
						},
						{
							language: 'fr-FR',
							gender: 'Female'
						},
						{
							language: 'fr-FR',
							gender: 'Male'
						},
						{
							language: 'he-IL',
							gender: 'Male'
						},
						{
							language: 'hi-IN',
							gender: 'Female'
						},
						{
							language: 'hi-IN',
							gender: 'Male'
						},
						{
							language: 'hu-HU',
							gender: 'Male'
						},
						{
							language: 'id-ID',
							gender: 'Male'
						},
						{
							language: 'it-IT',
							gender: 'Male'
						},
						{
							language: 'ja-JP',
							gender: 'Female'
						},
						{
							language: 'ja-JP',
							gender: 'Male'
						},
						{
							language: 'ko-KR',
							gender: 'Female'
						},
						{
							language: 'nb-NO',
							gender: 'Female'
						},
						{
							language: 'nl-NL',
							gender: 'Female'
						},
						{
							language: 'pl-PL',
							gender: 'Female'
						},
						{
							language: 'pt-BR',
							gender: 'Female'
						},
						{
							language: 'pt-BR',
							gender: 'Male'
						},
						{
							language: 'pt-PT',
							gender: 'Female'
						},
						{
							language: 'ro-RO',
							gender: 'Male'
						},
						{
							language: 'ru-RU',
							gender: 'Female'
						},
						{
							language: 'ru-RU',
							gender: 'Male'
						},
						{
							language: 'sk-SK',
							gender: 'Male'
						},
						{
							language: 'sv-SE',
							gender: 'Female'
						},
						{
							language: 'th-TH',
							gender: 'Male'
						},
						{
							language: 'tr-TR',
							gender: 'Female'
						},
						{
							language: 'vi-VN',
							gender: 'Male'
						},
						{
							language: 'zh-CN',
							gender: 'Female'
						},
						{
							language: 'zh-CN',
							gender: 'Male'
						},
						{
							language: 'zh-HK',
							gender: 'Female'
						},
						{
							language: 'zh-HK',
							gender: 'Male'
						},
						{
							language: 'zh-TW',
							gender: 'Female'
						},
						{
							language: 'zh-TW',
							gender: 'Male'
						}
					]
				}
			]
		}
}

export default Elements;
