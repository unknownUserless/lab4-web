import {Component} from '@angular/core';

@Component({
    selector: 'header-comp',
    template: `<h3 id="header">
        Студент: {{student}}<br/>
        Группа: {{group}}<br/>
        Вариант: {{variant}}
        </h3>`,
    styles: [`#header{
        background: inherit;
        font-size: 20pt;
        color: black;
    }`]
})


export class HeaderComponent{

    student: string = "Помельников Владислав Алексеевич";
    group: string = "P3211";
    variant: string = "151534";

}
