
import { Component, OnInit, Pipe, inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NzModalService, NzModalRef,NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

export class TreeNode {
  index: number =0;
  parent: number= 0;
  open: number=0;
  name: string='';
  path: string='';
  anchor: string='';
  children: TreeNode[] = [];
}


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})


export class HelpComponent implements OnInit {
  searchKey: any;
  innerHTML1: any;
  content: any;
  tree: any;
  index: any;
  maincontent: any;
  contentChanged = false;
  sfileName : any;
  isDesktop: Observable<boolean> | undefined;
  platforms:any[] = [];
  currentNode: TreeNode = new TreeNode;
  previousNode: TreeNode = new TreeNode;
  nextNode: TreeNode = new TreeNode;
  sidemenubar = 1;
  bmarks: any[] = [];
  toc = true;
  username: string ='';
  ufirst: string='';
  history: any[] = [];
  chapter: number =1;
  title: string='';
  indexText: string='';
  printflag = false;
  popoverOpen = false;
  nullNode = new TreeNode()


  openImage = 'assets/img/toc_open.gif';
 
  openLinkImage= 'assets/img/toc_open_with_link_arrow.gif';
  closedLinkImage= 'assets/img/toc_closed_with_link_arrow.gif';
  topicImage= 'assets/img/topic.gif';
  pdfImage='assets/img/pdf_doc.gif';
  popover: any;

  @ViewChild("domObj")
  domObj: any;
  sceneGraph: any;
  users: any;
  automaticClose = true
  explist: any[] = [];
  userForm : any;
  data = { var001:'', var002: '', var003:''};
  var1 : any;
  var2 : any;
  var3 : any;
  fileNamePassed :string ="";

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: {filename:string} = inject(NZ_MODAL_DATA);
  isShowCloseButton=true;
  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private sanitizer:DomSanitizer, 
    private _modal: NzModalRef,) {
                console.log('In constructor');
                this.initialize();
   }

 
 
  async initialize() {
    this.fileNamePassed = this.nzModalData.filename;
    let datastr : { [key: string]: any };
    let datastr1 : { [key: string]: any };

    this.chapter=0;
    this. http.get('assets/data/html/treedata.json').subscribe(res => {
        datastr = res;
        this.tree = datastr['treeData'];
        console.log(this.tree)
        this.sfileName = this.fileNamePassed;
        
        console.log('topic clicked on enter', this.fileNamePassed);
        this.topicClicked(this.fileNamePassed);
    });
      
    
  
    //this.data = { var001:'', var002: '', var003:''};

  }

  ngOnInit() {
    console.log('In nginit');
    this.initialize();

  }

  getDynamicBack(anchor: any) {
    const bcolor = '#b4b5b5';
    const tcolor = '#ffffff';
  }

  homeClicked() {
    console.log('homeclicked');
    this.sidemenu(1);
    this.topicClicked('');
  }


  sidemenu(id: number) {
    this.sidemenubar = id;
    this.toc = true;
  }

  closeModal() {
    this.#modal.close();
  }
  updateTree(e: any) {
    //for (const i of this.tree) {
        //console.log(this.tree[i].anchor)
        //if (this.tree[i].children)  {
          //for (const j of this.tree[i].children) {
              //console.log(this.tree[i].children[j].anchor)
            //}
        //}
      //}

  }
  previousClicked() {
    // this.currentNode = this.getNodewithFilename(this.sfileName, this.tree);
    // console.log('currentNode', this.currentNode);
    // if (this.currentNode.index > 1) {
    //   this.previousNode =  this.getNodewithpageid(this.currentNode.index - 1, this.tree);
    //   console.log('previousNode', this.previousNode);
    // } else {
    //   this.previousNode = this.nullNode;
    // }
    // if (this.previousNode) {
    //   console.log('previousNodeanchor', this.previousNode.anchor);
    //   this.topicClicked(this.previousNode.anchor);
    // }
  }

  nextClicked() {
    // this.currentNode = this.getNodewithFilename(this.sfileName, this.tree);
    // console.log('currentNode', this.currentNode)
    // if (this.currentNode.index < 372) {
    //   this.nextNode =  this.getNodewithpageid(this.currentNode.index + 1, this.tree);
    //   console.log('nextnode', this.previousNode)
    // } else {
    //   this.nextNode = this.nullNode;
    // }
    // if (this.nextNode) {
    //   console.log('nextNodeanchor', this.nextNode.anchor)
    //   this.topicClicked(this.nextNode.anchor)
    // }
  }

  topicClicked(e: string | undefined) {
    let filename1 = 'assets/data/html/' + e + '.html';
    this.sfileName = e
    console.log("topicClicked", this.sfileName)
    this.setFileOpen(this.sfileName);
    this.http.get(filename1, { responseType: 'text' })
      .subscribe(rawHtml => {
        let scontent = rawHtml.replace(/documents\/django-summernote/g, 'assets\/data\/html\/documents\/django-summernote');
        scontent = scontent.replace(/http:\/\/127.0.0.1:8080\/documents\/django-summernote/g, '\/assets\/data\/html\/documents\/django-summernote');
        scontent = scontent.replace(/http:\/\/127.0.0.1:8000\/documents\/django-summernote/g, '\/assets\/data\/html\/documents\/django-summernote');

        this.maincontent = this.sanitizer.bypassSecurityTrustHtml(scontent);
        //console.log(rawHtml, scontent)
        
      });

    // let datastr : { [key: string]: any };
    // if (e === '') {
    //   e = 'sect1.json'
    // }
    // this.updateTree(e);
    
    // console.log(this.tree);
    // let filename1 = 'assets/html/' + e;
    // this.sfileName = e;
    // console.log(filename1);
    // this.getChapter();
    // this.http1.get(filename1).subscribe(htm => {
    //   datastr = htm;
    //   this.maincontent = datastr["maincontent"]
    //   this.contentChanged = true;
    //   this.setFileOpen(this.sfileName);
    //   const ltitle = this.maincontent[0].title.split('  ')[0];
      
    //   //const ltitle = this.maincontent[0].title.split('\\u00a0')[0];
    //   console.log('Splttting title', ltitle);
    //   this.title = ltitle;
    //   if (this.title.length > 15) {
    //       this.title = '0';
    //   }
    //   console.log('titlestr',  this.title);
    // });
    // this._enableDynamicHyperlinks('');
  }

   _enableDynamicHyperlinks(d: string | RegExp): void
   {
      // Provide a minor delay to allow the HTML to be rendered and 'found'
      // within the view template
  //     setTimeout(() => 
  //     {
  //        // Query the DOM to find ALL occurrences of the <a> hyperlink tag
  //        const urls : any    = document.querySelectorAll('a');
  //        console.log(urls);
  //        //geetha - highlight index term
  //        if (d) {
  //           const textContent : any    = document.querySelectorAll('.x-para-9-0, .x-title-3-0');
  //           console.log('text', d, textContent);
  //           textContent.forEach((textC: { innerHTML: string; }) =>
  //           {
  //              console.log('forEach', textC);
  //              let repStr = textC.innerHTML.replace(new RegExp(d, "gi"), (match: string) => {
  //               return '<span class="highlightText">' + match + '</span>';
  //              });
  //              textC.innerHTML = repStr;
  //           });
  //        }
  //        // geetha - highlight index term end. 
  //        // Iterate through these
  //        urls.forEach((url: { addEventListener: (arg0: string, arg1: (event: any) => void, arg2: boolean) => void; innerText: any; href: { baseVal: any; }; }) => 
  //        {
  //           // Listen for a click event on each hyperlink found
  //           url.addEventListener('click', (event: { preventDefault: () => void; }) => 
  //           {
  //              // Retrieve the href value from the selected hyperlink
              
  //              //this._link = event.target.href;

  //              // Log values to the console and open the link within the InAppBrowser plugin
  //              console.log('Name is: ',  url.innerText);
  //              console.log('Link is: ', url.href.baseVal);

  //              let link : any;
  //              if (url.href.baseVal) {
  //                link = url.href.baseVal;
	// console.log('link SVG', url.href, link);
  //              }
  //              else {
  //                link = url.href;
  //              }

  //              const re = 'http:\/\/localhost:8100\/';
  //              const re1 = 'http:\/\/localhost:5000\/';
  //              const re2 = '.json';
               
  //              if (link.search(re1) >= 0) {
  //                 let rlink = link.replace('http:\/\/localhost:5000\/files\/', '../../Users\/');
  //                 let rlink1 = rlink.replace('!', '/');
  //                 console.log('matched file', rlink1);
  //                 this.fileClicked(rlink1);
  //              }

  //              if (link.search(re) >= 0) {
  //                if (link.search(re2) >= 0 ) {
  //                   console.log('no mp4');
  //                   event.preventDefault();
  //                   let rlink = link.replace('http:\/\/localhost:8100\/','');
  //                   console.log ('matched topic', rlink);

  //                     this.topicClicked(rlink);

  //                }
  //             }
              
  //           }, false);
  //        });
  //     }, 2000);
   }


  async fileClicked(url: any) {
    /*
    const modal = await this.modalCtrl.create({
        component: OpenPDFPage,
        componentProps: {
          url
        }
      });
    await modal.present();
    */
  }

  topicClicked1(e: string, d: string) {
    // let datastr : { [key: string]: any };
    // if (e === '') {
    //   e = 'sect1.json';
    // }
    // this.updateTree(e);
    // this.indexText = d;
    // console.log(this.indexText);

    // let filename1 = 'assets/html/' + e;
    // this.sfileName = e;
    // console.log(filename1);
    // this.getChapter();
    // this.http1.get(filename1).subscribe(htm => {
    //   datastr = htm
    //   this.maincontent = datastr["maincontent"];
    //   this.contentChanged = true;
    //   this.setFileOpen(this.sfileName);
    //   const ltitle = this.maincontent[0].title.split('  ')[0];
    //   this.title = ltitle;
    //   if (this.title.length > 15) {
    //       this.title = '0';
    //   }
    //   console.log('titlestr',  this.title);
    // });
    // this._enableDynamicHyperlinks(this.indexText);
  }



  setFileOpen(fname: any) {
    let parentNode : any;
    let parentid : any;
    this.currentNode = this.getNodewithFilename(fname, this.tree);
    console.log("setFileOpen", this.currentNode, this.tree)
    this.setallOpen(this.tree);
    if (this. currentNode.index > 1) {
      parentNode = this.currentNode;
      
      while (parentNode.parent > 0) {
        parentid = this.getParent(parentNode, this.tree);
        console.log('setFilepen', parentid, parentNode.parent);
        parentNode = this.getNodewithpageid(parentid, this.tree);
      }
    }
  }

  setallOpen(obj: any) {
    let k: any;
    for (k of obj) {
      if (k.index > 1) {
        k.open = false;
      }
      else {
        k.open = true;
      }
      if (k.children) {
        this.setallOpen(k.children);
      }
    }
  }

  getParent(node: { index: any; }, obj: any): any {
    let k: any;
    console.log('Get Parent: id', node.index, this.tree);
    for (k of obj) {
      console.log(k.index);
      if (k.index === node.index) {
        console.log('GetParent: found parent', k.index, k.parent)
        k.open = true;
        return k.parent;
      }
      if (k.children) {
        let c = this.getParent(node, k.children);
        if (c) {
          return c;
        }
    }
    }
  }
  getChapter() {
    // const str = this.sfileName;
    // console.log("get Chapter", this.sfileName)
    // if (str==="sect1sect4sect2.json"){
    //   this.chapter = 1;
    // } else {
    //   this.chapter = 0;
    // }

    // console.log("Chapter", this.chapter);
  }



  getNodewithFilename(cFilename: any, obj: any): TreeNode {
    let k: any;
    console.log('cFilename', cFilename, obj)
    for (k of obj) {
      console.log("Current parent checked", k)
      if (k.anchor === cFilename) {
        console.log ('found filename')
        return k;
      }
      if (k.children) {
          let c = this.getNodewithFilename(cFilename, k.children);
          if (c.index >0) {
            return c;
          }
      }
    }
     return this.nullNode;
  }

  getNodewithpageid(id: number, obj: any): TreeNode {
      let k: any;
      console.log('id', id, obj)
      for (k of obj) {
        if (k.index === id) {
          console.log ('found filename with id')
          return k;
        }
        if (k.children) {
            let c = this.getNodewithpageid(id,k.children)
            if (c.index>0) {
              return c;
            }
        }
      }
       return this.nullNode;
    }

  searchEbook() {
    // console.log(this.searchKey);
    // /*
    // if (this.searchKey !== '') {
    //   const urlPath = 'search?special={"keyword":"' + this.searchKey + '"}';
    //   this.router.navigateByUrl(urlPath);
    // }*/
    // if (this.searchKey !== '') {
    //   const urlPath = 'sqlitesearch?special={"keyword":"' + this.searchKey + '"}';
    //   console.log(urlPath);
    //   this.router.navigateByUrl(urlPath);
    // }
  }

  carprev(st:string){
    // console.log("in carprev")
    // console.log(st)
    // let el = document.getElementById(st);

    // console.log(el)
  }


}
