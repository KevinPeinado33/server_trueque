import { NotFoundException } from '@nestjs/common'

import { ArticleModel } from '../../domain/models'
import { ArticleRepositoryOrm } from '../../infrastructure/repositories'
import { ArticleMapper } from '../../domain/mappers'
export class FindArticleUseCase {

    constructor(
        private readonly articleRepository: ArticleRepositoryOrm
    ){ }

    async run (id: string): Promise< ArticleModel > {
        
        const articleFound = await this.articleRepository.findOneById( id )

        if ( !articleFound ) {
            throw new NotFoundException(`No encontramos el articulo con id #${ id }`)
        }

        return ArticleMapper.entityToModel( articleFound )
        
    }

}