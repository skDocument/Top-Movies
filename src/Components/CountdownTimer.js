import React from 'react';
import { firebase } from "../firebase";
import { getFirestore, collection, getDocs ,doc, updateDoc} from 'firebase/firestore/lite';
import moment from 'moment';
import MyContext from '../Context/MyContext';




class CountdownTimer extends React.Component {
    static contextType = MyContext;
    constructor(props) {
      super(props);
      this.state = { time: {}, seconds: 10 };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    
    componentDidMount = async() => {
      let res = firebase;
      let db = getFirestore(res)
      const citiesCol = collection(db, 'offerMovie');
      const citySnapshot = await getDocs(citiesCol);

      let projects = citySnapshot.docs.map(doc => ({
        docID : doc.id ,
        ...doc.data()
      }))
      
      let bm = moment().format('HH:mm:ss')
      let tobm = moment(bm , 'HH:mm:ss').diff(moment().startOf('days'), 'seconds')
      let timeLf = Math.abs(86400 - tobm); 

      this.setState({
        seconds : timeLf
      })
   
      this.startTimer()
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
        
    }
  
    startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown = async() => {
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      
      if (seconds == 0) { 
        clearInterval(this.timer);
        let res = firebase;
        let db = getFirestore(res)
        await updateDoc(doc(db, "offerMovie" , 'ZTOx0lubviyVNVSmIh6e'), {
          isExit : false,
        });
        this.context.setState({
          base : {...this.context.state.base , firebase : {...this.context.state.base.firebase , changeOfferMovie : true }}
        })
        window.location.reload();
        
      }
    }
    
    render() {
      return(
        <ul className='countdownDisplay'>
          <li>{this.state.time.h} : ساعت  </li>
          <li>{this.state.time.m} : دقیقه </li>
          <li>{this.state.time.s} : ثانیه </li> 
        </ul>
      );
    }
}


export default CountdownTimer;