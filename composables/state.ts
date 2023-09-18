import { CommonContent } from '~/types/api'

export const useStateNextPage = () => useState('nextPage')

export const useStateCommonContent = useState<CommonContent>('common_content')

export const useStatePreview = useState('preview', () => ({
    isActive: false,
    token: undefined,
}))
