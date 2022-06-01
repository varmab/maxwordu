import { PixelRatio } from 'react-native';
//import {getCorrectFontSizeForScreen} from './multiResolution' ;
import {
    Dimensions
} from 'react-native'
var windowSize = Dimensions.get('window');
export default {
    BASE: {
        numLetters: 3, // num letters to display (6ds, 6es)
    },
    level:[{
        startSpeed: 1000
    }],
    LEVELS : [{
            min: 2, // min length of word
            startSpeed: 3000 // between letters (ms)
        },
        {
            min: 3,
            startSpeed: 2000
        },
        {
            min: 4,
            startSpeed: 1000
        },
        {
            min: 4,
            startSpeed: 500
        }
      
    ],
    "sourceType": "unambiguous"
};