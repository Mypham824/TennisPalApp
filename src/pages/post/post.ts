import { Component, EventEmitter, OnInit, OnDestroy, Input, Output } from '@angular/core';


import {AppPosts} from '../../providers/app-data';
import { ReferenceData} from '../../providers/ref-data';



@Component({
    selector: 'app-post',
    templateUrl: 'post.html'
})

export class PostPosts implements OnInit, OnDestroy {
    @Input() post: AppPosts;
    @Output() onViewComments = new EventEmitter<string>();

    constructor(private refData: ReferenceData) { }

       ngOnInit() {
        var self = this;
        self.refData.getPostsRef().child(self.post.key).on('child_changed', self.onCommentAdded);
    }

      ngOnDestroy() {
         console.log('destroying..');
        var self = this;
        self.refData.getPostsRef().child(self.post.key).off('child_changed', self.onCommentAdded);
    }

   
    public onCommentAdded = (childSnapshot, prevChildKey) => {
       console.log(childSnapshot.val());
        var self = this;

        self.post.comments = childSnapshot.val();
    }

    viewComments(key: string) {
        this.onViewComments.emit(key);
    }

}


