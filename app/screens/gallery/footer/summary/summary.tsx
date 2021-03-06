// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';

import {paddingHorizontal} from '@components/safe_area_view/iphone_x_spacing';

import type {SummaryProps} from 'types/screens/gallery';

import Actions from './actions';
import Avatar from './avatar';
import Details from './details';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flexDirection: 'row',
        height: Platform.select({ios: 99, android: 85}),
        padding: 12,
    },
    containerLandscape: {
        height: 64,
    },
    details: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 5,
    },
});

const Summary = (props: SummaryProps) => {
    const containerStyles: Array<ViewStyle> = [styles.container];

    if (props.isLandscape) {
        containerStyles.push(styles.containerLandscape);
    }

    return (
        <View style={[containerStyles, paddingHorizontal(props.isLandscape)]}>
            <View style={styles.details}>
                <Avatar
                    avatarUri={props.avatarUri}
                    theme={props.theme}
                />
                <Details
                    channel={props.channelName}
                    isDirect={props.isDirectChannel}
                    ownPost={props.ownPost}
                    user={props.displayName}
                />
            </View>
            <View style={styles.actions}>
                <Actions
                    file={props.file}
                    linkAction={props.copyPublicLink}
                    downloadAction={props.dowloadFile}
                />
            </View>
        </View>
    );
};

export default Summary;
