// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// *******************************************************************
// - [#] indicates a test step (e.g. # Go to a screen)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element testID when selecting an element. Create one if none.
// *******************************************************************

import jestExpect from 'expect';

import {ChannelScreen} from '@support/ui/screen';
import {Channel, Post, Setup} from '@support/server_api';

describe('Messaging', () => {
    let team;
    let user;

    beforeAll(async () => {
        ({team, user} = await Setup.apiInit());

        await ChannelScreen.open(user);
    });

    afterAll(async () => {
        await ChannelScreen.logout();
    });

    it('MM-T109 User can\'t send the same message repeatedly', async () => {
        const message = Date.now().toString();

        const {disabledSendButton, sendButton, postInput} = ChannelScreen;

        // # Type a message
        await postInput.tap();
        await postInput.typeText(message);

        // # Tap the send button
        await expect(sendButton).toBeVisible();
        await sendButton.tap();
        await expect(sendButton).not.toExist();

        // # Then tap send button repeatedly
        await expect(disabledSendButton).toBeVisible();
        await expect(disabledSendButton).toExist();
        await disabledSendButton.multiTap(3);

        // * Check that message is successfully posted
        await expect(element(by.text(message))).toExist();

        // * Check that no duplicate message is saved.
        const {channel} = await Channel.apiGetChannelByName(team.name, 'town-square');
        const {posts} = await Post.apiGetPostsInChannel(channel.id);
        jestExpect(posts.length).toEqual(3);
        jestExpect(posts[0].message).toEqual(message);
        jestExpect(posts[1].message).toEqual(`${user.username} joined the team.`);
        jestExpect(posts[2].message).toEqual('sysadmin joined the team.');
    });
});
