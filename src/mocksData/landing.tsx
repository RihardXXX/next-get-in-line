import { GiAstronautHelmet } from 'react-icons/gi';
import {
    RiUserSearchFill,
    RiQuestionAnswerFill,
    RiContractFill,
} from 'react-icons/ri';
import { MdDateRange } from 'react-icons/md';

console.log('GiAstronautHelmet', GiAstronautHelmet);

export interface ItemInterface {
    item: string;
}

export interface DataLandingItemInterface {
    title: string;
    icon: JSX.Element;
    descriptionList: ItemInterface[];
}

const description =
    'Вы перестанете опаздывать на встречи, а Ваш партнер будет рад, что вы пришли вовремя';

const dataLanding: DataLandingItemInterface[] = [
    {
        title: '1. Пройдите регистрацию или авторизуйтесь',
        icon: <GiAstronautHelmet className="w-full h-full" />,
        descriptionList: [
            {
                item: '1.1. Если вы впервые в приложении то нажмите на кнопку регистрации внизу и пройдите регистрацию',
            },
            {
                item: '1.2. Если вы уже зарегистрированы то нажмите на кнопку авторизация и авторизуйтесь',
            },
            {
                item: '1.3. Обращаем Ваше внимания для сохранения и защиты ваших персональных данных, в приложении работает двухфакторная авторизация',
            },
        ],
    },
    {
        title: '2. Найдите пользователя в поиске или по QRCODE',
        icon: <RiUserSearchFill className="w-full h-full" />,
        descriptionList: [
            {
                item: '2.1. Перейдите в раздел поиска после регистрации',
            },
            {
                item: '2.2. Найдите пользователя вводя имя или по QRCODE',
            },
            {
                item: '2.3. Перейдите на его страницу',
            },
        ],
    },
    {
        title: '3. Выберите дату и время встречи',
        icon: <MdDateRange className="w-full h-full" />,
        descriptionList: [
            {
                item: '3.1. Выберите дату и время, в которое хотите явится к пользователю',
            },
            {
                item: '3.2. Отправьте запрос на встречу',
            },
        ],
    },
    {
        title: '4. Дождитесь ответа',
        icon: <RiQuestionAnswerFill className="w-full h-full" />,
        descriptionList: [
            {
                item: '4.1. Проверьте статус встречи, одобрена ли она со стороны пользователя',
            },
        ],
    },
    {
        title: '5. Дождитесь ответа-одобрения от партнера',
        icon: <RiContractFill className="w-full h-full" />,
        descriptionList: [
            {
                item: '5.1. После одобрения встречи от партнера, можете смело идти на встречу',
            },
            {
                item: '5.2. При встрече можете показать партнеру QRCODE встречи',
            },
        ],
    },
];

export { description, dataLanding };
