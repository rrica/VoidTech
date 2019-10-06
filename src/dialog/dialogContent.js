import dialog from './dialog.js';
import stateMachine from '../stateMachine';

export default {
    "speech-001": {
        "text": "Hello Dave!<br>2nd line<br>3rd line<br>4 line<br>5th line",
        "speaker": "lisa",
        "buttons": [
            {
                "text": "I want to hear more",
                "action": () => dialog.show('speech-003')
            },
            {
                "text": "just explode, please",
                "action": () => stateMachine.player.sprite.x -= 20
            },
            {
                "text": "leave me alone"
            }
        ]
    },
    "speech-002": {
        "text": "What can I do for you?",
        "speaker": "lisa",
        "action": () => alert('always happens after this dialog')
    },
    "speech-003": {
        "text": "I don't have anything more to tell you.",
        "speaker": "lisa"
    },
    "speech-004": {
        "text": "Sounds like a heavy door just moved.",
        "speaker": "dave"
    }
    "speech-awakening": {
    "text": "Where am I? I don’t remember anything…<br>“Hello? Anybody there?”<br>Maybe the computer can give me some answers.",
    "speaker": "dave",
    },
}
