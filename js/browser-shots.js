/**
 * Browser Shots TinyMCE Integration
 */

;(function() {
	var properties = [];
	var shortcode_name = 'browser-shot';
	var selection = '';

	tinymce.create( 'tinymce.plugins.browsershots', {
		init: function(editor, url) {

			properties.push(
				{
					'type': 'textbox',
					'name': 'url',
					'label': editor.getLang( 'browsershots.image_url' ),
					'value': 'http://',
					'size': 40
				},
				{
					'type': 'textbox',
					'name': 'href',
					'label': editor.getLang( 'browsershots.image_link_url' ),
					'value': '',
					'size': 40
				},
				{
					'type': 'textbox',
					'name': 'width',
					'label': editor.getLang( 'browsershots.image_width' ),
					'value': '600',
					'size': 10
				},
				{
					'type': 'textbox',
					'name': 'height',
					'label': editor.getLang( 'browsershots.image_height' ),
					'value': '450',
					'size': 10
				},
				{
					'type': 'textbox',
					'name': 'caption',
					'label': editor.getLang( 'browsershots.image_caption' ),
					'value': '',
					'size': 40
				},
				{
					'type': 'textbox',
					'name': 'alt',
					'label': editor.getLang( 'browsershots.image_alt_text' ),
					'value': '',
					'size': 40
				},
				{
					'type': 'checkbox',
					'name': 'target',
					'label': editor.getLang( 'browsershots.new_window' )
				}
			);

			editor.addButton('browsershots', {
				title: 'Browser Shots',
				image: url.replace('/js', '/images') + '/browsershots-icon.png',
				onclick: function() {

					selection = editor.selection.getContent();

					properties[4].value = selection;

					editor.windowManager.open({
                        title: 'Browser Shots',
                        body: properties,
                        onsubmit: function (e) {

							// Dialog prompt's
							var width = e.data.width;
							var height = e.data.height;
							var website = e.data.url;
							var link = e.data.href;
							var caption = e.data.caption;
							var alt = e.data.alt;
							var target = e.data.target;

							// Build shortcode tag
							if ( website != null && website != '' ) {
								var shortcode = '[' + shortcode_name + ' url="' + website + '"';
								if ( width != null && width != '' ) {
									shortcode += ' width="' + width + '"';
								}
								if ( height != null && height != '' ) {
									shortcode += ' height="' + height + '"';
								}
								if ( link != null && link != '' ) {
									shortcode += ' href="' + link + '"';
								}
								if ( alt != null && alt != '' ) {
									shortcode += ' alt="' + alt + '"';
								}
								if ( true == target ) {
									shortcode += ' target="_blank"';
								}

								shortcode += ']';

								if ( caption != null && caption != '' ) {
									shortcode += caption + '[/' + shortcode_name + ']';
								}

								if ( selection.length ) {
									editor.selection.setContent( shortcode );
								} else {
									editor.insertContent( shortcode );
								}
							}

                        }
                    });

				}
			});
		},
		createControl: function() {
			return null;
		},
		getInfo: function() {
			return {
				longname: 'Browser Shots',
				author: 'Ben Gillbanks',
				authorurl: 'https://prothemedesign.com',
				infourl: 'https://wordpress.org/extend/plugins/browser-shots/',
				version: '1.5.1'
			};
		}
	});

	tinymce.PluginManager.add( 'browsershots', tinymce.plugins.browsershots );

})();