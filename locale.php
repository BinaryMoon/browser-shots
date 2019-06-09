<?php
/**
 * Translations for Browser Shots javascript
 *
 * @package browser-shots
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( '_WP_Editors' ) ) {
	require ABSPATH . WPINC . '/class-wp-editor.php';
}


$strings = 'tinyMCE.addI18n(
    "' . _WP_Editors::$mce_locale . '.browsershots",
	{
		image_url: "' . esc_js( __( 'Image Url', 'browser-shots' ) ) . '",
		image_link_url: "' . esc_js( __( 'Image Link Url (optional)', 'browser-shots' ) ) . '",
		image_width: "' . esc_js( __( 'Image Width', 'browser-shots' ) ) . '",
		image_height: "' . esc_js( __( 'Image Height', 'browser-shots' ) ) . '",
		image_caption: "' . esc_js( __( 'Image Caption', 'browser-shots' ) ) . '",
		image_alt_text: "' . esc_js( __( 'Image Alt Text', 'browser-shots' ) ) . '",
		new_window: "' . esc_js( __( 'Open Link in new Window?', 'browser-shots' ) ) . '"
	}
)';
