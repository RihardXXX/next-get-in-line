'use client';

import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import React from 'react';
import {
    dataLanding,
    DataLandingItemInterface,
    ItemInterface,
} from '@/mocksData/landing';

function CardList({
    dataLanding,
}: {
    dataLanding: DataLandingItemInterface[];
}) {
    return (
        <div className="flex flex-col gap-2 ml-2 mr-2 mt-4 mb-2">
            {!!dataLanding.length &&
                dataLanding.map((card: DataLandingItemInterface, index) => (
                    <Card className="py-4" key={`card${index}`}>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <h4 className="font-bold text-large">
                                {card.title}
                            </h4>
                            {!!card.descriptionList.length &&
                                card.descriptionList.map(
                                    ({ item }: ItemInterface, idx) => (
                                        <small
                                            className="text-default-500 mt-1"
                                            key={`item:${idx}`}
                                        >
                                            {item}
                                        </small>
                                    ),
                                )}
                        </CardHeader>
                        {/*<CardBody className="overflow-visible py-2">*/}
                        {/*    <Image*/}
                        {/*        alt="Card background"*/}
                        {/*        className="object-cover rounded-xl !w-full"*/}
                        {/*        src="https://nextui.org/images/hero-card-complete.jpeg"*/}
                        {/*    />*/}
                        {/*</CardBody>*/}
                    </Card>
                ))}
        </div>
    );
}

export default CardList;
