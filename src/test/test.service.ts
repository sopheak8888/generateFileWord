import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { TemplateHandler } from 'easy-template-x';

@Injectable()
export class TestService {
  async generateWordFile(res) {
    const template = fs.readFileSync('assets/template.docx');

    const handler = new TemplateHandler();
    const docx = await handler.process(template, {
      lastName: this.formatInput('Doe', 15),
      firstName: this.formatInput('John', 15),
      gender: this.formatInput('Male', 8),
      country: this.formatInput('USA', 20),
      organization: this.formatInput('NestJS', 20),
      position: this.formatInput('Developer', 22),
      typeOfSport: this.formatInput('Football', 22),
      DOB: this.formatInput('01/01/1999', 42),
      passportId: this.formatInput('123456789', 18),
      passportIssueDate: this.formatInput('01/01/2019', 15),
      id: this.formatInput('123456789', 42),
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=file.docx');
    return res.send(docx);
  }

  formatInput(input: string, space: number) {
    // my field is .................... and i want to replace my input in the middle of the dots
    let str = '…';
    for (let i = 0; i < space; i++) {
      str += '…';
    }
    const strLength = str.length;
    const inputLength = input.length;
    const diff = strLength - inputLength;
    const half = Math.floor(diff / 2);
    const left = str.slice(0, half);
    const right = str.slice(half + inputLength);
    return left + input + right;
  }
}
