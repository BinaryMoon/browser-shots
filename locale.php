<?php
/**
 * Translations for Browser Shots javascript
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( '_WP_Editors' ) ) {
    require( ABSPATH . WPINC . '/class-wp-editor.php' );
}


$strings = 'tinyMCE.addI18n(
    "' . _WP_Editors::$mce_locale . '.browsershots",
	{
		image_url: "' . esc_js( __( 'Image Url', 'browsershots' ) ) . '",
		image_link_url: "' . esc_js( __( 'Image Link Url (optional)', 'browsershots' ) ) . '",
		image_width: "' . esc_js( __( 'Image Width', 'browsershots' ) ) . '",
		image_height: "' . esc_js( __( 'Image Height', 'browsershots' ) ) . '",
		image_caption: "' . esc_js( __( 'Image Caption', 'browsershots' ) ) . '",
		image_alt_text: "' . esc_js( __( 'Image Alt Text', 'browsershots' ) ) . '",
		new_window: "' . esc_js( __( 'Open Link in new Window?', 'browsershots' ) ) . '"
	}
)';