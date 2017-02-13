import { JsonController, Get } from 'routing-controllers';
import { InMemoryNoteRepository } from './../../../modules/note/infrastructure/persistance/in-memory/InMemoryNoteRepository';
import { MongoNoteRepository } from './../../../modules/note/infrastructure/persistance/mongo/MongoNoteRepository';

import { UseCase as ListNoteUseCase } from './../../../application/use-cases/list-notes/UseCase';
import { UseCase as AddNoteUseCase } from './../../../application/use-cases/add-note/UseCase';
import { UseCase as DeleteNoteUseCase } from './../../../application/use-cases/delete-note/UseCase';
import { UseCase as EditNoteUseCase } from './../../../application/use-cases/edit-note/UseCase';
import { UseCase as DisplayNoteUseCase } from './../../../application/use-cases/display-note/UseCase';


@JsonController()
export class ApiController {

  private useCases: Map<string, any> = new Map<string, any>();
  public static inMemoryNoteRepository: InMemoryNoteRepository = new InMemoryNoteRepository();
  public static mongoNoteRepository: MongoNoteRepository = new MongoNoteRepository();

  constructor() {
    const repo = ApiController.inMemoryNoteRepository;
    // const repo = ApiController.mongoNoteRepository;
    this.useCases.set('listNotes', new ListNoteUseCase(repo));
    this.useCases.set('addNote', new AddNoteUseCase(repo));
    this.useCases.set('deleteNote', new DeleteNoteUseCase(repo));
    this.useCases.set('editeNote', new EditNoteUseCase(repo));
    this.useCases.set('displayNote', new DisplayNoteUseCase(repo));
  }

  getUseCase(name: string): any {
    return this.useCases.get(name);
  } 
}
