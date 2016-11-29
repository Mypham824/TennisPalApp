import {Component, ViewChild} from '@angular/core';
import {NavController, Content} from 'ionic-angular';



/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})

export class ChatDetailPage {
  @ViewChild(Content) content: Content;

  public chat: any;
  public newMessage: any;

  constructor(public nav: NavController) {
    // get sample data only
    //this.chat = chatService.getItem(navParams.get('id'));
  
  }

  // send message
  sendMessage() {
    if (this.newMessage) {
      this.chat.messages.push({
        type: 'sent',
        text: this.newMessage,
        image: '',
        time: 'Just now'
      });

      // clear input
      this.newMessage = '';

      // scroll to bottom
      setTimeout(() => {
        // scroll to bottom
        this.content.scrollToBottom();
      }, 200)
    }
  }
}
