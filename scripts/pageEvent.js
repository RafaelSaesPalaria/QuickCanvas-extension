/*
 * Copyright (c) 2024 Rafael Saes Palaria
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// Main Code
/**
 * @Called by the popup.js
 * @Do send the message to the content.js as it works as part of the page
 */
chrome.runtime.onMessage.addListener(function (message) {
    chrome.tabs.query({active:true, currentWindow: true},function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,message)
    });
})