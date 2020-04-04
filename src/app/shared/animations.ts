import { trigger, transition, style, animate } from '@angular/animations';

export const routerInAnimation = trigger('routerInAnimation',[
    transition(':enter',[
        style({
            opacity: 0
        }),
        animate('0.5s ease-out')
    ]),
    transition(':leave',[
        style({
            opacity: 1
        }),
        animate('0.5s ease-out')
    ])
])

export const dropDownAnimation = trigger('dropDownAnimation',[
    transition(':enter',[
        style({
            height: "*"
        }),
        animate('0.5s ease-out')
    ]),
    transition(':leave',[
        style({
            height: 0
        }),
        animate('0.5s ease-out')
    ])
])