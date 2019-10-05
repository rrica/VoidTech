import dialog from './dialog.js';
import stateMachine from '../stateMachine';

export default {
    "speech-001": {
        "text": "Hello Dave!<br>2nd line<br>3rd line<br>4 line<br>5th line",
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
        "action": () => alert('always happens after this dialog')
    },
    "speech-003": {
        "text": "I don't have anything more to tell you."
    },
    "speech-004": {
        "text": "Sounds like a heavy door just moved."
    }
}