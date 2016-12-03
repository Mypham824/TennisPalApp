import { Injectable } from '@angular/core';

import { AppPosts, PostComments } from '../providers/app-data';
import { DataSort} from '../providers/data-sort';

@Injectable()
export class DataRoute {

    constructor (private dataSort: DataSort) { } 


    //function retrieves posts created by user from the database
    getPosts (snapshot: any): Array<AppPosts> {
        let posts: Array<AppPosts> = [];
        if (snapshot.val() == null)
            return posts;

           
            let list = snapshot.val(); //list variable set to object from database 


            Object.keys(snapshot.val()).map((key: any) => {
                let post: any = list[key];
                posts.push ({
                    key: key,
                    title: post.title,
                    matchtype: post.matchtype,
                    matchmode: post.matchmode,
                    bestof: post.bestof,
                    location: post.location,
                    dateofmatch: post.dateofmatch,
                    description: post.description,
                    datecreated: post.datecreated,
                    user: {uid: post.user.uid, username: post.user.username},
                    comments: post.comments == null ? 0 : post.comments
                    });
            });
                return posts;
            }


            getPost(snapshot: any, key: string): AppPosts {

                let post: AppPosts = {
                    key: key,
                    title: snapshot.title,
                    matchtype: snapshot.matchtype,
                    matchmode: snapshot.matchmode,
                    bestof: snapshot.bestof,
                    location: snapshot.location,
                    dateofmatch: snapshot.dateofmatch,
                    description: snapshot.description,
                    datecreated: snapshot.datecreated,
                    user: snapshot.user,
                    comments: snapshot.comments == null ? 0 : snapshot.comments
                };
                return post;
            }

    getComments (snapshot: any): Array<PostComments> {
        let comments: Array<PostComments> = [];
            if (snapshot.val() == null)
            return comments; 

            let list = snapshot.val();

            Object.keys(snapshot.val()).map((key:any) => {
                let comment: any = list[key];
                this.dataSort.groupByBoolean(comment.votes, true);
                comments.push({
                    key:key,
                    post: comment.post,
                    text: comment.text,
                    datecreated: comment.datecreated,
                    user: comment.user,
                    votesUp: this.dataSort.groupByBoolean(comment.votes, true),
                    votesDown: this.dataSort.groupByBoolean(comment.votes, false)
                });

            });
                return comments;
            }
   getComment(snapshot: any, commentKey: string): PostComments {
        let comment: PostComments;

        if (snapshot.val() == null)
            return null;

        let snapshotComment = snapshot.val();
        console.log(snapshotComment);
        comment = {
            key: commentKey,
            text: snapshotComment.text,
            post: snapshotComment.post,
            datecreated: snapshotComment.datecreated,
            user: snapshotComment.user,
            votesUp: this.dataSort.groupByBoolean(comment, true),
            votesDown: this.dataSort.groupByBoolean(comment, false)
        };

        return comment;
    }
}