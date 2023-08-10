import { DynamicModule, Module, forwardRef } from '@nestjs/common'

import { CategoryRepositoryOrm } from '../repositories'
import { ArticleModule } from '../../article.module'
import { FindCategoriesUseCase } from '../../app/category'


@Module({
    imports: [ forwardRef(() => ArticleModule) ]
})
export class CategoryUseCaseProxyModule {

    static FIND_CATEGORIES_USECASE = 'findCategoriesUseCaseProxy'

    static register(): DynamicModule {
        return {
            module: CategoryUseCaseProxyModule,
            providers: [
                {
                    inject: [ CategoryRepositoryOrm ],
                    provide: CategoryUseCaseProxyModule.FIND_CATEGORIES_USECASE,
                    useFactory: ( 
                        categoryRepository: CategoryRepositoryOrm
                    ) => new FindCategoriesUseCase( categoryRepository )
                    
                }
            ],
            exports: [ 
                CategoryUseCaseProxyModule.FIND_CATEGORIES_USECASE
            ]
        }

    }

}