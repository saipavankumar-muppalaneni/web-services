

import { Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer'

import React from 'react';
import { useVenue } from '../hooks/VenueContext';

export default function PDFDocument({ data, venue, qr }) {
    return <Document>

        <Page size={'B0'} style={styles.page}>
            <View style={styles.view}>
                <Text style={styles.name}>
                    {venue?.name}


                </Text>
            </View>
            <View style={styles.view}>

                <Image allowDangerousPaths src={qr} style={styles.qr} />
            </View>
            <View style={styles.view}>
                <Text style={styles.title}>
                    {data.title}


                </Text>
            </View>
        </Page>
    </Document>;
}


const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        display: 'block',

        padding: 100

    },
    view: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 100
    },

    qr: {
        width: '50%',

    },

    logo: {
        width: '25%',
        height: "100%"
    },
    title: {
        color: 'black',
        textAlign: 'center',
        fontSize: 100
    },
    name: {
        fontSize: 200
    }

})