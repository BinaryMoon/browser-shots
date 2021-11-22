<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 * Also register rest route and initialize Gutenberg block.
 *
 * @since   2.7.0
 * @package browser-shots
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Browser_Shots_Gutenberg {

	/**
	 * Initialize actions for Gutenberg.
	 *
	 * @since 2.7.0
	 */
	public function __construct() {

		add_action( 'enqueue_block_editor_assets', array( $this, 'browser_shots_block_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'add_frontend_styles' ) );
		add_action( 'init', array( $this, 'register_bs_block' ) );

	}


	/**
	 * Enqueue Gutenberg block assets for backend editor.
	 *
	 * @uses {wp-blocks} for block type registration & related functions.
	 * @uses {wp-element} for WP Element abstraction — structure of blocks.
	 * @uses {wp-i18n} to internationalize the block's text.
	 * @uses {wp-editor} for WP editor styles.
	 * @since 2.7.0
	 */
	public function add_frontend_styles() {

		// Styles.
		wp_enqueue_style(
			'browser-shots-frontend-css', // Handle.
			plugins_url( '/dist/blocks.style.build.css', dirname( __FILE__ ) ),
			array(),
			BROWSER_SHOTS_VERSION,
			'all' // Enqueue the script in the footer.
		);

	}


	/**
	 * Enqueue Gutenberg block assets for backend editor.
	 *
	 * @uses {wp-blocks} for block type registration & related functions.
	 * @uses {wp-element} for WP Element abstraction — structure of blocks.
	 * @uses {wp-i18n} to internationalize the block's text.
	 * @uses {wp-editor} for WP editor styles.
	 * @since 2.7.0
	 */
	public function browser_shots_block_assets() {

		// Styles.
		wp_enqueue_style(
			'browser-shots-block-css', // Handle.
			plugins_url( '/dist/blocks.editor.build.css', dirname( __FILE__ ) ),
			array(),
			BROWSER_SHOTS_VERSION,
			'all' // Enqueue the script in the footer.
		);

		// Scripts.
		wp_enqueue_script(
			'browser-shots-block-js', // Handle.
			plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
			BROWSER_SHOTS_VERSION,
			true
		);

		if ( function_exists( 'wp_set_script_translations' ) ) {

			wp_set_script_translations( 'browser-shots-block-js', 'browser-shots' );

		} elseif ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {

			$locale  = gutenberg_get_jed_locale_data( 'browser-shots' );
			$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "browser-shots" );';
			wp_script_add_data( 'browser-shots-block-js', 'data', $content );

		} elseif ( function_exists( 'wp_get_jed_locale_data' ) ) {

			/* for 5.0 */
			$locale  = wp_get_jed_locale_data( 'browser-shots' );
			$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "browser-shots" );';
			wp_script_add_data( 'browser-shots-block-js', 'data', $content );

		}

	}


	/**
	 * Registers the block in PHP and its attributes.
	 *
	 * @since 2.7.0
	 */
	public function register_bs_block() {

		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		register_block_type(
			'browser-shots/browser-shots',
			array(
				'attributes'      => array(
					'html'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'url'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'width'        => array(
						'type'    => 'int',
						'default' => 600,
					),
					'height'       => array(
						'type'    => 'int',
						'default' => 450,
					),
					'alt'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'link'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'target'       => array(
						'type'    => 'string',
						'default' => '',
					),
					'classname'    => array(
						'type'    => 'string',
						'default' => '',
					),
					'rel'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'display_link' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'image_size'   => array(
						'type'    => 'string',
						'default' => 'medium',
					),
					'content'      => array(
						'type'    => 'string',
						'default' => '',
					),
					'post_links'    => array(
						'type'    => 'boolean',
						'default' => false,
					),
				),
				'render_callback' => array( $this, 'block_frontend' ),
			)
		);

	}


	/**
	 * Block front-end output.
	 *
	 * @since 2.7.0
	 * @see register_block
	 *
	 * @param array $attributes Array of passed shortcode attributes.
	 */
	public function block_frontend( $attributes ) {

		if ( is_admin() ) {
			return;
		}

		$args = array(
			'url'          => esc_url_raw( $attributes['url'] ),
			'width'        => absint( $attributes['width'] ),
			'height'       => absint( $attributes['height'] ),
			'alt'          => sanitize_text_field( $attributes['alt'] ),
			'link'         => ! empty( $attributes['link'] ) ? esc_url_raw( $attributes['link'] ) : '',
			'target'       => sanitize_text_field( $attributes['target'] ),
			'class'        => sanitize_text_field( $attributes['classname'] ),
			'image_class'  => sanitize_text_field( isset( $attributes['align'] ) ? 'align' . $attributes['align'] : 'alignnone' ),
			'rel'          => sanitize_text_field( $attributes['rel'] ),
			'display_link' => (bool) $attributes['display_link'],
			'post_links'   => (bool) $attributes['post_links'],
		);

		$content = ( isset( $attributes['content'] ) && ! empty( $attributes['content'] ) ) ? wp_kses_post( $attributes['content'] ) : '';

		$browsershots = new BrowserShots();
		return wp_kses_post( $browsershots->shortcode( $args, $content ) );

	}

}

new Browser_Shots_Gutenberg();
