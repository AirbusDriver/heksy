import { JsonController, Get } from 'routing-controllers';

import { InMemoryNoteRepository } from './../../../modules/note/infrastructure/persistance/in-memory/InMemoryNoteRepository';
import { UseCase as ListNoteUseCase } from './../../../application/use-cases/list-notes/UseCase';
import { UseCase as AddNoteUseCase } from './../../../application/use-cases/add-note/UseCase';
import { UseCase as DeleteNoteUseCase } from './../../../application/use-cases/delete-note/UseCase';
import { UseCase as EditNoteUseCase } from './../../../application/use-cases/edit-note/UseCase';
import { UseCase as DisplayNoteUseCase } from './../../../application/use-cases/display-note/UseCase';

import { InMemoryRetroRepository } from './../../../modules/retro/infrastructure/persistance/in-memory/InMemoryRetroRepository';
import { UseCase as CreateRetroUseCase } from './../../../application/use-cases/create-retro/UseCase';
import { UseCase as DisplayRetroUseCase } from './../../../application/use-cases/display-retro/UseCase';


@JsonController()
export class ApiController {

  private useCases: Map<string, any> = new Map<string, any>();
  public static inMemoryNoteRepository: InMemoryNoteRepository = new InMemoryNoteRepository();
  public static inMemoryRetroRepository: InMemoryRetroRepository = new InMemoryRetroRepository();

  constructor() {
    const noteRepo = ApiController.inMemoryNoteRepository;
    const retroRepo = ApiController.inMemoryRetroRepository;

    this.useCases.set('listNotes', new ListNoteUseCase(noteRepo));
    this.useCases.set('addNote', new AddNoteUseCase(noteRepo, retroRepo));
    this.useCases.set('deleteNote', new DeleteNoteUseCase(noteRepo));
    this.useCases.set('editeNote', new EditNoteUseCase(noteRepo));
    this.useCases.set('displayNote', new DisplayNoteUseCase(noteRepo));

    this.useCases.set('createRetro', new CreateRetroUseCase(retroRepo));
    this.useCases.set('displayRetro', new DisplayRetroUseCase(retroRepo, noteRepo));
  }

  protected getUseCase(name: string): any {
    return this.useCases.get(name);
  } 
}
