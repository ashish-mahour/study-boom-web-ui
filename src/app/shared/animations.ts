import { trigger, transition, style, animate } from '@angular/animations';

export let routerInAnimation = trigger('routerInAnimation',[
    transition('void => *',[
        style({
            opacity:0
        }),
        animate('0.5s')
    ]),
    transition('* => void',[
        style({
            opacity:1
        }),
        animate('0.5s')
    ])
])