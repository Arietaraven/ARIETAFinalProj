import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post_service';
import { Post } from '../post.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {
  form!: FormGroup;
  index: number = 0;
  editMode = false;
  constructor(private postservice: PostService, private router: Router,
    private actRoute: ActivatedRoute) {}

  ngOnInit(): void {

    let title = '';
    let description = '';
    let imgPath = '';


    this.actRoute.params.subscribe((params: Params)=> {
      if(params['index']){
        console.log(params['index']);
        this.index = params['index'];

        const post = this.postservice.getSpecPost (this.index);
        
        title = post.title;
        description = post.description;
        imgPath = post.imgPath;
        this.editMode = true;


      }
    }
    );


    this.form = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      imgPath: new FormControl(imgPath, [Validators.required]),
      description: new FormControl(description, [Validators.required])
      
    })

  }
  onSubmit() {
    const title = this.form.value.title;
    const imgPath = this.form.value.imgPath;
    const description = this.form.value.description;
    const author = this.form.value.author;
    const numberOfLikes = this.form.value.numberOfLikes;
    const comments = this.form.value.comments;

const post: Post = new Post(title, imgPath, description, author , new Date(), 0, []);
    


      if(this.editMode==true){
        this.postservice.updatePost(this.index, post)
      }
      else {
        this.postservice.addPost(post);
      }
   

    this.router.navigate(['post-list']);
  }
  
} 
